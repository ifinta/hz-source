package nxt;

public class CheckPoints {
	static final String[] previousBlockId = Constants.isTestnet
			? new String[] { "13140566258904767706", "10172245134917234535", "14872600660401553292",
					"1147357704975444010", "2792720926526738312", "3631443508205994694", "2545036620218953545",
					"6782139916016488310", "13761751053896524208", "1158413815638341097", "12815917644603417229",
					"4675067004471086134", "5185912757308957984", "11871258702739450736", "5204546093077799834",
					"11442735265750954558", "16016629408432128306", "3380742619012633928", "12114428060850324118",
					"2070491317587008282", "7849973527304547885", "792074285648940081", "17050918872370944521",
					"6105356175573153398", "103752890069092961", "66683169010194672", "17106996858062238509",
					"13857036921421758490", "18016594835608099065", "15719606079027090850", "5598466699625108615",
					"12066119872842237764", "6305352489312815066", "10097954188778122996", "159705671207495590",
					"13192816920332235042", "12049217306131296336", "483256622252603092", "13019849442669570197",
					"7875100262002903525", "5593990947383574240" }
			: new String[] { "14430834544923371345", "1511610636016390317", "13983563835561761634",
					"9431499489837341965", "17368224745210830882", "9914565492336305150", "10170643142238884355",
					"6307700918115392852", "17151803426336599821", "3088724196241212240", "11290721159359314512",
					"6320945062678289178", "2384471094765020570", "17205438163284953784", "1015188503555653789",
					"16170807139134723599", "13743889190645893386", "15899696299730148900", "8172574028009297213",
					"14625953736167353214", "9776176813749905281", "13853922339714571239", "1520469355685963633",
					"17434519956359369005", "11519000452749083273", "1057790894371289012", "16614856624079516583",
					"4401094804134522167", "4869119267586072135", "13719005056603910900", "7341990340325215408",
					"3519466420934907921", "15319496314389334235", "10009271458177036279", "2277585652311624564",
					"17740087063935712707", "2434099128242623125", "6393359791201379066", "588664509168982814",
					"14437730538798592080", "10362060908672079491", "4089979777850212171", "13444285644225833354",
					"4315650950427107311", "18131736727604965491", "2852354808517286262", "5569522589103034719",
					"403489227108062005", "6977883148820936534", "4396160475647033935", "8799316482944045200",
					"8708897085961242200", "3693778325905778791", "1848445477940981620", "16255153146732095619",
					"10822972667188983057", "12356318406135920596", "1879779598116193814", "1541683138424066274",
					"12332305100120630225", "804932894582527543", "6351228307127547127", "2210794508872270191",
					"9382214059976828611", "3500338569133372016", "16230651763712904946", "7420661794400561603",
					"14997381705961180644", "5979034825504769736", "3442600603688869793", "10760096361141609295",
					"6868884217012740668", "15539660480660543242", "8355653934287777834", "6653352184045065777",
					"7780357115962038478", "18071686181611358889", "7408465676159573334", "14782746321613897760",
					"3219336130689176339", "11804011756219343157", "8394224002757646864", "4008455075125493687",
					"18195329034996680566", "4069380650268372523", "16431701212382273718", "14443624106941869622",
					"4440684529369240476", "12405537255964895679", "3582161517300399628", "1180153011223597849",
					"2134931897764653212", "4957951414087638749", "8903879522847510276", "9522066170548035987",
					"8987800560686487701", "15938280149652484210", "17776366391564076520", "8585093803845796802",
					"8843501344561069637", "9223101528538073081", "8469991552513035346", "8463648962751044224",
					"1995497831203059908", "16147046892677247074", "2622721914868268879", "1604182133839883334",
					"17146747586730185922", "10005817476842699331", "12191876359151094230", "7996927262773388413",
					"12290025250444463195", "14261990893236913107", "3795715770215211638", "16212195580744439135",
					"13308711227857791339", "11661468404551601418", "10730039125253301315", "822282405383423534",
					"5881078337476164109", "10478337783050757539", "14182160542176306368", "7727428516928252175",
					"10847383505674577717", "7455804398164573641", "2749779125825566205", "4852023862682813887",
					"6151658855517953716", "14817585585268034323", "14288900695647052920", "190634229418027993",
					"18098735261133293643", "4693309559246148389", "2176563859159121233", "5771503090033782326",
					"16506496057988992244", "4160660705305676220", "5692556244652962184", "10843811400886717569",
					"15637295873927935651", "9648346831536411680", "4173088312857174505", "2457278398374804519",
					"9783179373456366578", "8201624903326206", "15598381327940952703", "15629706383124131810",
					"16442430586470997629", "13568955191072571400", "15391545988561048537", "13537388950854781000",
					"955598323665674721", "14615211196962582396", "13897173491982073701", "4978369236272677045",
					"5158566312417413073", "1716986777505986258", "15772742234528827662", "121361288714156801",
					"6460781981675119099", "2795003094395841506", "8641359637061689548", "17847666445234227254",
					"10684956191069379945", "10636604892754137281", "9020459387668027597", "6294246933876100367",
					"5843824761428272480", "2992853402581299231", "12397981968241218807", "4350954243204143970",
					"13167551938216330697", "168771377511283523", "3597315932774554681", "14465607466009363192",
					"9341152458013441081", "4125486835942123395", "17916560528026203848", "17793527826605645311",
					"16238276817215285034", "14430399499658504872", "14782137207822108034", "12574266483952686730",
					"17965936314658577125", "11721114941622351378", "6847268917556895724", "4642037923765807680",
					"828491042679542017", "4745246951374406454", "6259833287850841055", "15560218571428301656",
					"2011602136391519942", "2426075788114663127", "17311147414938439457", "3317388572628925139",
					"10078475567591041447", "3747562435410718106", "9225853075531655280", "17009341358591688561",
					"271002313802216349", "2700213191514054638", "8644406411748400546", "4582819530961433935",
					"1505339508734733626", "8443555338846626211", "8903586410966910322", "14960642883118011333",
					"7742869104137151827", "6387533116472394223", "15813042178130593129", "13735248820402190146",
					"1792589375219836588", "13977758450976277875", "2747014794868440311", "15618836242317897038",
					"13640492727383211908", "10853720851032920465", "3945901808493290517", "573408031782444897",
					"6122524302628186003", "1317347791888484888", "4449885492063927126", "2453689034270469806",
					"804328334585135629", "7176301230733093458", "16963034935093070759", "7446867763138722723",
					"12180913386966427598", "6252682498805083626", "16955550521251351563", "11695168309084849917",
					"10553661616065378441", "11168783952815532284", "9725171489904978298", "1078517319216412761",
					"12288147354587433314", "5553321946889544078", "14602267476097132194", "4203550010508073928",
					"8447745374025857109", "10323391523863155214", "12923119841392664217", "11848412778032218445",
					"2989863934871820377", "12637315754343455916", "7395069237823735357", "6063684605313439969",
					"3442959706171179785", "17555799271608933277", "18334393572627433716", "6561685910920469084",
					"6291833364354249902", "2104759694971047846", "1162177588111931833", "9147531753929061151",
					"14152317196533250615", "16785952329258209848", "1258266171367731100", "2208617876497213181",
					"8328145656051118906", "16948459962215936652", "2613796121298920570", "3820109024147513866",
					"4010205826415796454", "6378100050769813894", "10282212481214995402", "16153507992269639040",
					"17491103282640081967", "8455163033650784436", "17388863459432574524", "12708965638199895387",
					"11057153552530342802", "4525381826351989186", "4117203908939956634", "177078949142362767",
					"7478240485769193167", "8851895718105264858", "15217144329999206464", "2271659610203154137",
					"12857024569530121752", "16669209994277499171", "13969913867328226411", "6985211756794667457",
					"9326780090509151369", "13265001539175860904", "3903242725028379730", "7508823427046386432",
					"13050306593073657135", "12800362114541701042", "2760724222460769909", "13711367577565592865",
					"3348730943691991423", "5520873206709357485", "18038278015991411100", "14143095791453269074",
					"16970301750996355042", "4482899970601916575", "4373398529231825661", "11508428592834326492",
					"4214042437815853353", "10348690959429700466", "16367375738911921877", "11617154284476201047",
					"18049819910582460832", "6811326040741591970", "6687442793353577688", "16282570741329783173",
					"619203992936983903", "5254132002454282807", "2369342525398517320", "3663371071436803652",
					"17120262838051214814", "4639822568729673138", "16295417800256707094", "2901652192421874146",
					"2253123907626469637", "14636974121105759440", "5260724131617182014", "16765111549140287604",
					"12218852968758168957", "11665760524774316977", "3406848341696438922", "10122881937785461650",
					"9103020797626909519", "6975244179338302749", "4212327501692646118", "286246994339924086",
					"14975767358348132549", "5696271353764477252", "1424867480633844815", "16950066384238715134",
					"2707975404792271408", "17527103200494815849", "8294988631969118491", "10012541431734780842",
					"4931051003591810713", "17907741231335898224", "4951270071437518091", "18405208284491857175",
					"17696255604601757444", "6506897408830478027", "16018894165330905011", "15375788935848144145",
					"2750697366582195789", "15004085379300038337", "15167005575046790688", "17728277757650498374",
					"6883787341289626146", "16946875955155999781", "192152424181918556", "686629114438643429",
					"13264662464499718580", "9818976798327403375", "12216922575606091985", "17396676741691423237",
					"10202752288339725091", "1242228655145019272", "13282033352774130484", "14724038020569346012",
					"13925894016188006321", "5229971736531733903", "4106108097213623468", "9340296373632534882",
					"17730629814834578327", "5673478697318351527", "10808851058391863184", "13882161434516655965",
					"11248403984726895655", "5871040737387157085", "2518882096694010085", "12556128128768145476",
					"3243313239492595279", "2835349070806266512", "6792790197051213875", "10602625843913774332",
					"16959177607672235669", "14204664801226891911", "18181107136005289426", "12040044752878855671",
					"335749272211804301", "16421997088345592769", "2372691443817865149", "14663822692772979931",
					"5871659641657751021", "13007882350310709782", "4294178335467931887", "9699361028433570002",
					"5596735315061419231", "1753782311329661852", "5333601187263333644", "6020162959483490900",
					"5403914579646440941", "10394074107070750896", "2331009231016846742", "11928560906014185919",
					"7495705662390704819", "4145314887126085466", "6344570690082513413", "17279434631578459849",
					"17336024043214532604", "11673439923526019763", "14742262422061009973", "14708292894553805848",
					"5531416524829471004", "18233520691994422743", "9517518411318491041", "8844308135538085850",
					"16980117794531312238", "10817799037329484916", "17911075495889347398", "6540260242496429655",
					"6861706202015698952", "16865385712280728236", "331423583114377241", "15087164242591932494",
					"17341890064065146323", "14105033800779440900", "17449216894811589506", "9664664998436510375",
					"2500653660911663643", "14846217526776905096", "11775269313832374812", "1558971197068962307",
					"17134424304183568173", "17939939786614567157", "8677903307866833912", "1115360044713538428",
					"10037492210394922329", "2502150335364878647", "3236380505638136503", "4490353142571989944",
					"16283941270551613525", "222840134230627938", "16838083597618804914", "542950338772788562",
					"6294517078228236076", "9561197505386999064", "8268189531734392903", "8315679881480249397",
					"14809935305035635387", "2560767320460447655", "1183260968099049727", "3928339695656148615",
					"775111318209925522", "10878406312893138315", "9049368130782150894", "1816253061813433722",
					"10103539835018219807", "4393904589267102362", "1672986579408472186", "14452925427091486360",
					"6475881149571297090", "9082912369629399982", "3846531374165447733", "8933002003955272292",
					"13588520104568163966", "4106187422380325623", "15574897003423577517", "17552983154934910869",
					"792002704844385877", "14377016742958695861", "2715865040256695520", "15561745794129326505",
					"2398155052735298052", "5708463353330567506", "10399539818275560007", "13166963382141340747",
					"8389703530083872510", "969847571837458085", "1039598219909904862", "6442895368834355387",
					"9157473940623366649", "5079763273213105828", "1998294922656734587", "2622011117139074832",
					"15606367829907200066", "6882607289791886841", "3750903433908156765", "14531840816183201146",
					"6749418373236780869", "197983255164559127", "11596530330326054900", "456378713198672133",
					"4484198004575140221", "2435379967237596361", "14844698058209847653", "11001047683811741392",
					"4603046422550997353", "579841943659916524", "6224621377018993961", "7666892558357378511",
					"8588951067195631002", "9875005002148467723", "3198808135177438460", "4616823525788724227",
					"8777447779076617853", "10048274427604822122", "2017997599510317049", "18358526645023499786",
					"16185646436295893283", "12984331856129841761", "10485177593702578734", "6322002713289480630",
					"1832041259924841000", "13597597587561125623", "9714907201635019896", "4306213128129323316",
					"7667735123965589576", "16263890939351220909", "1485167144224859825", "977274128868041891",
					"5965469632786065925", "17652016801081991492", "13619610399303353812", "12004199990453183361",
					"13804000894385642113", "2696943090608992852", "17561314186779779143", "12228652286657202557",
					"16293005084400884309", "7410094288135354833", "2738285875368176540", "4734036043556920263",
					"9396427460996899772", "17689915045076504011", "10211456901484055037", "11236394326753831732",
					"13132875352737751230", "9870806439921832801", "4843241812862979454", "6197352146680109390",
					"9228598068199421026", "7700793181561959091", "13044870419552987564", "17915502140572324105",
					"18192080775601298576", "7020694370238792760", "8912615766366715733", "15798860816639347986",
					"15114567332849849", "13626330263393858608", "7868368328330084423", "10182677588328026364",
					"4456788855479836409", "5963972649407459913", "599600935698434658", "14214901426638156505",
					"18388297098272421848", "1489248435799541745", "11841268298793178785", "13533479405577822430",
					"18338611456655622608", "16338616093864119242", "16727337346404195393", "10829290643385600549",
					"5611041803035039443", "1162117930960675557", "968501753014570441", "2350419380312847887",
					"14863178503285741945", "2591417790448873002", "943075861882171497", "7134076982794629781",
					"15104350331065279111", "8409917610934648483", "15639969725405027910", "13973517297259402904" };
}