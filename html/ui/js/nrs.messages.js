/**
 * @depends {nrs.js}
 */
var NRS = (function(NRS, $, undefined) {
	var _messages = {};
	var _messageTypesChecked = 0;

	NRS.pages.messages = function(callback) {
		_messages = {};
		_messageTypesChecked = 0;

		$(".content.content-stretch:visible").width($(".page:visible").width());

		NRS.getAccountMessages("public", function() {
			NRS.getAccountMessagesComplete(callback);
		});

		NRS.getAccountMessages("private", function() {
			NRS.getAccountMessagesComplete(callback);
		});

		NRS.getAccountMessages("payment", function() {
			NRS.getAccountMessagesComplete(callback);
		})
	}

	NRS.getAccountMessages = function(type, callback) {
		var transactionType = (type == "payment" ? 0 : 1);
		var transactionSubtype = (type == "payment" ? 1 : (type == "private" ? 0 : 8));

		NRS.sendRequest("getAccountTransactions+", {
			"account": NRS.account,
			"firstIndex": 0,
			"lastIndex": 75,
			"type": transactionType,
			"subtype": transactionSubtype
		}, function(response) {
			_messageTypesChecked++;

			if (response.transactions && response.transactions.length) {
				for (var i = 0; i < response.transactions.length; i++) {
					var otherUser = (response.transactions[i].recipient == NRS.account ? response.transactions[i].sender : response.transactions[i].recipient);

					if (!(otherUser in _messages)) {
						_messages[otherUser] = [];
					}

					_messages[otherUser].push(response.transactions[i]);
				}
			}

			callback();
		});
	}

	NRS.getAccountMessagesComplete = function(callback) {
		if (_messageTypesChecked == 3) {
			if (NRS._totalMessages == 0) {
				$("#no_message_selected").hide();
				$("#no_messages_available").show();
				$("#messages_sidebar").empty();
				NRS.pageLoaded(callback);
			} else {
				var activeAccount = false;

				var $active = $("#messages_sidebar a.active");

				if ($active.length) {
					activeAccount = $active.data("account");
				}

				var rows = "";
				var menu = "";

				var sortedMessages = [];

				for (var otherUser in _messages) {
					_messages[otherUser].sort(function(a, b) {
						if (a.timestamp > b.timestamp) {
							return 1;
						} else if (a.timestamp < b.timestamp) {
							return -1;
						} else {
							return 0;
						}
					});

					var otherUserRS = (otherUser == _messages[otherUser][0].sender ? _messages[otherUser][0].senderRS : _messages[otherUser][0].recipientRS);

					sortedMessages.push({
						"timestamp": _messages[otherUser][_messages[otherUser].length - 1].timestamp,
						"user": otherUser,
						"userRS": otherUserRS
					});
				}

				sortedMessages.sort(function(a, b) {
					if (a.timestamp < b.timestamp) {
						return 1;
					} else if (a.timestamp > b.timestamp) {
						return -1;
					} else {
						return 0;
					}
				});

				for (var i = 0; i < sortedMessages.length; i++) {
					var sortedMessage = sortedMessages[i];

					var extra = "";

					if (sortedMessage.user in NRS.contacts) {
						extra = " data-contact='" + NRS.getAccountTitle(sortedMessage, "user") + "' data-context='messages_sidebar_update_context'";
					}

					rows += "<a href='#' class='list-group-item' data-account='" + NRS.getAccountFormatted(sortedMessage, "user") + "' data-account-id='" + NRS.getAccountFormatted(sortedMessage.user) + "'" + extra + "><h4 class='list-group-item-heading'>" + NRS.getAccountTitle(sortedMessage, "user") + "</h4><p class='list-group-item-text'>" + NRS.formatTimestamp(sortedMessage.timestamp) + "</p></a>";
				}

				$("#messages_sidebar").empty().append(rows);

				if (activeAccount) {
					$("#messages_sidebar a[data-account=" + activeAccount + "]").addClass("active").trigger("click");
				}

				NRS.pageLoaded(callback);
			}
		}
	}

	NRS.incoming.messages = function(transactions) {
		if (NRS.hasTransactionUpdates(transactions)) {
			//save current scrollTop    	
			var activeAccount = $("#messages_sidebar a.active");

			if (activeAccount.length) {
				activeAccount = activeAccount.data("account");
			} else {
				activeAccount = -1;
			}

			NRS.loadPage("messages");
		}
	}

	$("#messages_sidebar").on("click", "a", function(e) {
		e.preventDefault();

		$("#messages_sidebar a.active").removeClass("active");
		$(this).addClass("active");

		var otherUser = $(this).data("account-id");

		$("#no_message_selected, #no_messages_available").hide();

		$("#inline_message_recipient").val(otherUser);
		$("#inline_message_form").show();

		var last_day = "";
		var output = "<dl class='chat'>";

		var messages = _messages[otherUser];

		var sharedKey = null;

		if (messages) {
			for (var i = 0; i < messages.length; i++) {
				var decoded = "";
				var extra = "";
				var type = "";

				if (messages[i].type == 0 && messages[i].subtype == 1) {
					type = "payment";
				} else if (messages[i].type == 1 && messages[i].subtype == 8) {
					type = "private";
				} else {
					type = "public";
				}
				if (type == "private" || type == "payment") {
					try {
						decoded = NRS.tryToDecryptMessage(messages[i]);
						extra = "decrypted";
					} catch (err) {
						if (err.errorCode && err.errorCode == 1) {
							decoded = $.t("error_decryption_passphrase_required");
							extra = "to_decrypt";
						} else {
							decoded = $.t("error_decryption_unknown");
						}
					}
				} else {
					try {
						decoded = converters.hexStringToString(messages[i].attachment.message);
					} catch (err) {
						//legacy...
						if (messages[i].attachment.message.indexOf("feff") === 0) {
							decoded = NRS.convertFromHex16(messages[i].attachment.message);
						} else {
							decoded = NRS.convertFromHex8(messages[i].attachment.message);
						}
					}
				}

				if (decoded) {
					decoded = String(decoded).escapeHTML().nl2br();

					if (extra == "to_decrypt") {
						decoded = "<i class='fa fa-warning'></i> " + decoded;
					} else if (extra == "decrypted") {
						if (type == "payment") {
							decoded = "<strong>+" + NRS.formatAmount(messages[i].amountNQT) + " NXT</strong><br />" + decoded;
						}

						decoded = "<i class='fa fa-lock'></i> " + decoded;
					}
				} else {
					decoded = "<i class='fa fa-warning'></i> " + $.t("error_could_not_decrypt_message");
					extra = "decryption_failed";
				}

				var day = NRS.formatTimestamp(messages[i].timestamp, true);

				if (day != last_day) {
					output += "<dt><strong>" + day + "</strong></dt>";
					last_day = day;
				}

				output += "<dd class='" + (messages[i].recipient == NRS.account ? "from" : "to") + (extra ? " " + extra : "") + "'><p>" + decoded + "</p></dd>";
			}
		}

		if (NRS.unconfirmedTransactions.length) {
			for (var i = 0; i < NRS.unconfirmedTransactions.length; i++) {
				var unconfirmedTransaction = NRS.unconfirmedTransactions[i];

				if (unconfirmedTransaction.type == 1 && (unconfirmedTransaction.subtype == 0 || unconfirmedTransaction.subtype == 8) && unconfirmedTransaction.recipient == otherUser) {
					var decoded = "";
					var extra = "";

					if (unconfirmedTransaction.subtype == 8) {
						try {
							decoded = NRS.tryToDecryptMessage(unconfirmedTransaction);
							extra = "decrypted";
						} catch (err) {
							if (err.errorCode && err.errorCode == 1) {
								decoded = $.t("error_decryption_passphrase_required");
								extra = "to_decrypt";
							} else {
								decoded = $.t("error_decryption_unknown");
							}
						}
					} else {
						try {
							decoded = converters.hexStringToString(unconfirmedTransaction.attachment.message);
						} catch (err) {
							//legacy...
							if (unconfirmedTransaction.attachment.message.indexOf("feff") === 0) {
								decoded = NRS.convertFromHex16(unconfirmedTransaction.attachment.message);
							} else {
								decoded = NRS.convertFromHex8(unconfirmedTransaction.attachment.message);
							}
						}
					}

					output += "<dd class='to tentative" + (extra ? " " + extra : "") + "'><p>" + (extra == "to_decrypt" ? "<i class='fa fa-warning'></i> " : (extra == "decrypted" ? "<i class='fa fa-lock'></i> " : "")) + String(decoded).escapeHTML().nl2br() + "</p></dd>";
				}
			}
		}

		output += "</dl>";

		$("#message_details").empty().append(output);
	});

	$("#messages_sidebar_context").on("click", "a", function(e) {
		e.preventDefault();

		var account = NRS.getAccountFormatted(NRS.selectedContext.data("account"));
		var option = $(this).data("option");

		NRS.closeContextMenu();

		if (option == "add_contact") {
			$("#add_contact_account_id").val(account).trigger("blur");
			$("#add_contact_modal").modal("show");
		} else if (option == "send_nxt") {
			$("#send_money_recipient").val(account).trigger("blur");
			$("#send_money_modal").modal("show");
		} else if (option == "account_info") {
			NRS.showAccountModal(account);
		}
	});

	$("#messages_sidebar_update_context").on("click", "a", function(e) {
		e.preventDefault();

		var account = NRS.getAccountFormatted(NRS.selectedContext.data("account"));
		var option = $(this).data("option");

		NRS.closeContextMenu();

		if (option == "update_contact") {
			$("#update_contact_modal").modal("show");
		} else if (option == "send_nxt") {
			$("#send_money_recipient").val(NRS.selectedContext.data("contact")).trigger("blur");
			$("#send_money_modal").modal("show");
		}

	});

	NRS.forms.sendMessage = function($modal) {
		var data = NRS.getFormData($modal.find("form:first"));

		var converted = $modal.find("input[name=converted_account_id]").val();

		if (converted) {
			data.recipient = converted;
		}

		var message = $.trim(data.message);

		if (!message) {
			return {
				"error": $.t("error_message_required")
			};
		}

		return {
			"data": data
		};
	}

	$("#inline_message_form").submit(function(e) {
		e.preventDefault();

		var data = {
			"recipient": $.trim($("#inline_message_recipient").val()),
			"feeNXT": "1",
			"deadline": "1440",
			"secretPhrase": $.trim($("#inline_message_password").val())
		};

		if (!NRS.rememberPassword) {
			if ($("#inline_message_password").val() == "") {
				$.growl($.t("error_passphrase_required"), {
					"type": "danger"
				});
				return;
			}

			var accountId = NRS.getAccountId(data.secretPhrase);

			if (accountId != NRS.account) {
				$.growl($.t("passphrase_incorrect"), {
					"type": "danger"
				});
				return;
			}
		}

		var message = $.trim($("#inline_message_text").val());

		if (!message) {
			$.growl($.t("error_message_required"), {
				"type": "danger"
			});
			return;
		}

		var $btn = $("#inline_message_submit");

		$btn.button("loading");

		var requestType = "sendMessage";

		try {
			data = NRS.addMessageData(data, "sendMessage");
		} catch (err) {
			$.growl(String(err.message).escapeHTMl(), {
				"type": "danger"
			});
			return;
		}

		NRS.sendRequest(requestType, data, function(response, input) {
			if (response.errorCode) {
				$.growl(NRS.translateServerError(response).escapeHTML(), {
					type: "danger"
				});
			} else if (response.fullHash) {
				$.growl($.t("success_message_sent"), {
					type: "success"
				});

				$("#inline_message_text").val("");

				if (data.encryptedMessageData) {
					NRS.addDecryptedTransaction(response.transaction, {
						"encryptedMessage": String(data["_extra"].message)
					});
				}

				NRS.addUnconfirmedTransaction(response.transaction, function(alreadyProcessed) {
					if (!alreadyProcessed) {
						$("#message_details dl.chat").append("<dd class='to tentative" + (data.encryptedMessageData ? " decrypted" : "") + "'><p>" + (data.encryptedMessageData ? "<i class='fa fa-lock'></i> " : "") + String(data["_extra"].message).escapeHTML() + "</p></dd>");
					}
				});

				//leave password alone until user moves to another page.
			} else {
				//TODO
				$.growl($.t("error_send_message"), {
					type: "danger"
				});
			}
			$btn.button("reset");
		});
	});

	NRS.forms.sendMessageComplete = function(response, data) {
		data.message = data._extra.message;

		if (!(data["_extra"] && data["_extra"].convertedAccount)) {
			$.growl($.t("success_message_sent") + " <a href='#' data-account='" + NRS.getAccountFormatted(data, "recipient") + "' data-toggle='modal' data-target='#add_contact_modal' style='text-decoration:underline'>" + $.t("add_recipient_to_contacts_q") + "</a>", {
				"type": "success"
			});
		} else {
			$.growl($.t("success_message_sent"), {
				"type": "success"
			});
		}

		if (data.encryptedMessageData) {
			NRS.addDecryptedTransaction(response.transaction, {
				"encryptedMessage": String(data["_extra"].message)
			});
		}

		if (NRS.currentPage == "messages") {
			var date = new Date(Date.UTC(2013, 10, 24, 12, 0, 0, 0)).getTime();

			var now = parseInt(((new Date().getTime()) - date) / 1000, 10);

			var $sidebar = $("#messages_sidebar");

			var $existing = $sidebar.find("a.list-group-item[data-account=" + NRS.getAccountFormatted(data, "recipient") + "]");

			if ($existing.length) {
				if (response.alreadyProcesed) {
					return;
				}
				$sidebar.prepend($existing);
				$existing.find("p.list-group-item-text").html(NRS.formatTimestamp(now));

				var isEncrypted = (data.encryptedMessageData ? true : false);

				if ($existing.hasClass("active")) {
					$("#message_details dl.chat").append("<dd class='to tentative" + (isEncrypted ? " decrypted" : "") + "'><p>" + (isEncrypted ? "<i class='fa fa-lock'></i> " : "") + data.message.escapeHTML() + "</p></dd>");
				}
			} else {
				var accountTitle = NRS.getAccountTitle(data, "recipient");

				var extra = "";

				if (accountTitle != data.recipient) {
					extra = " data-context='messages_sidebar_update_context'";
				}

				var listGroupItem = "<a href='#' class='list-group-item' data-account='" + NRS.getAccountFormatted(data, "recipient") + "'" + extra + "><h4 class='list-group-item-heading'>" + accountTitle + "</h4><p class='list-group-item-text'>" + NRS.formatTimestamp(now) + "</p></a>";
				$("#messages_sidebar").prepend(listGroupItem);
			}
		}
	}

	$("#message_details").on("click", "dd.to_decrypt", function(e) {
		$("#messages_decrypt_modal").modal("show");
	});

	NRS.forms.decryptMessages = function($modal) {
		var data = NRS.getFormData($modal.find("form:first"));

		var success = false;

		try {
			success = NRS.decryptAllMessages(_messages, data.secretPhrase);
		} catch (err) {
			if (err.errorCode && err.errorCode <= 2) {
				return {
					"error": err.message.escapeHTML()
				};
			} else {
				return {
					"error": $.t("error_messages_decrypt")
				};
			}
		}

		if (data.rememberPassword) {
			NRS.setDecryptionPassword(data.secretPhrase);
		}

		$("#messages_sidebar a.active").trigger("click");

		if (success) {
			$.growl($.t("success_messages_decrypt"), {
				"type": "success"
			});
		} else {
			$.growl($.t("error_messages_decrypt"), {
				"type": "danger"
			});
		}

		return {
			"stop": true
		};
	}

	return NRS;
}(NRS || {}, jQuery));