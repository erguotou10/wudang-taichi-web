/**
 * Mock 数据 - 武当太极九势 + 景点 + 路线 + 徽章
 */

export const moves = [
  {
    _id: 'move_01',
    name: '起势（引气归元）',
    category: 'nine_forms',
    difficulty: 1,
    description: '双脚并拢，身体自然直立，周身放松。双手缓缓上抬至与肩平，再徐徐下按至丹田。意念引导天地之气归入丹田，身心合一，万念归一。此势为全套之始，重在调身、调息、调心。',
    breathing: '双手上抬时缓缓吸气，下按时缓缓呼气。呼吸深长匀细，以意领气，气沉丹田。反复三次，使气息平和。',
    commonMistakes: [
      { title: '耸肩', wrong: '双肩紧张上提，气息上浮', correct: '双肩自然下沉，松肩坠肘' },
      { title: '意念散乱', wrong: '心神不宁，杂念纷飞', correct: '排除杂念，意守丹田，精神内敛' }
    ],
    coverImage: '',
    duration: 10,
    sortOrder: 1
  },
  {
    _id: 'move_02',
    name: '怀抱阴阳',
    category: 'nine_forms',
    difficulty: 2,
    description: '双手在体前环抱，如抱太极之球。左手在上为阳，右手在下为阴，阴阳相合，动静相因。身体微微转动，体会阴阳转换之理。此势体现道家阴阳互根、刚柔相济的核心思想。',
    breathing: '环抱时吸气，微转时呼气。呼吸与动作协调，以意导气，气贯双臂。',
    commonMistakes: [
      { title: '手臂僵硬', wrong: '双臂用力环抱，僵直不松', correct: '手臂保持弧形，松而不懈' },
      { title: '高低不分', wrong: '双手齐平，阴阳不分', correct: '左手略高于右手，体现阴阳之别' }
    ],
    coverImage: '',
    duration: 12,
    sortOrder: 2
  },
  {
    _id: 'move_03',
    name: '野马分鬃',
    category: 'nine_forms',
    difficulty: 2,
    description: '双手交替向两侧分开，如野马奔腾时鬃毛飞扬。上步弓步，前手分出，后手按于胯旁。动作舒展大方，步法轻灵稳健，体现太极的开合劲。',
    breathing: '分手时吸气，定势时呼气。迈步时气沉丹田，分掌时气贯指尖。',
    commonMistakes: [
      { title: '上下脱节', wrong: '手动脚不动，手脚不协调', correct: '手脚同时运动，上下相随' },
      { title: '弓步不稳', wrong: '重心偏前，前膝过脚尖', correct: '坐实后腿，前膝与脚尖同向' }
    ],
    coverImage: '',
    duration: 12,
    sortOrder: 3
  },
  {
    _id: 'move_04',
    name: '揽雀尾',
    category: 'nine_forms',
    difficulty: 3,
    description: '包含掤、捋、挤、按四个动作，是太极拳的核心招式。掤如水负舟，捋如顺手牵羊，挤如排山倒海，按如水中按球。四劲连贯，一气呵成，体现太极八门劲法之精髓。',
    breathing: '掤时吸气，捋时呼气，挤时吸气，按时呼气。四劲转换时呼吸自然衔接。',
    commonMistakes: [
      { title: '掤劲不足', wrong: '手臂软塌无力', correct: '手臂要有掤劲，圆撑饱满' },
      { title: '四劲断开', wrong: '掤捋挤按各自孤立', correct: '四劲连贯，劲断意不断' }
    ],
    coverImage: '',
    duration: 18,
    sortOrder: 4
  },
  {
    _id: 'move_05',
    name: '叶底摘桃',
    category: 'nine_forms',
    difficulty: 2,
    description: '一手下按如拨开树叶，另一手向前上方穿出如摘取桃子。身体微转，虚实转换灵活。动作轻灵敏捷，如在密叶之下探手摘果，体现太极的巧劲和灵敏。',
    breathing: '下按手呼气，穿掌时吸气。定势时缓缓呼气，气沉丹田。',
    commonMistakes: [
      { title: '穿掌无力', wrong: '前手软绵，没有穿劲', correct: '指尖领劲，力达指尖' },
      { title: '身体歪斜', wrong: '上身前俯或侧歪', correct: '保持立身中正，以腰为轴转动' }
    ],
    coverImage: '',
    duration: 10,
    sortOrder: 5
  },
  {
    _id: 'move_06',
    name: '玉龙抖鳞',
    category: 'nine_forms',
    difficulty: 3,
    description: '身体猛然一抖，双手向外弹抖发力，如苍龙抖动鳞甲，气势磅礴。发力瞬间全身松弹，劲从脚起，传于腰胯，达于四梢。此势为发劲之法，体现太极刚柔相济的特点。',
    breathing: '蓄劲时深吸气，发力时短促呼气。发力后迅速放松，恢复自然呼吸。',
    commonMistakes: [
      { title: '用蛮力', wrong: '全身僵硬用力抖动', correct: '松弹发力，劲从脚底传上来' },
      { title: '耸肩发力', wrong: '肩部紧张上提', correct: '松肩坠肘，以腰胯带动' }
    ],
    coverImage: '',
    duration: 10,
    sortOrder: 6
  },
  {
    _id: 'move_07',
    name: '道人拴门',
    category: 'nine_forms',
    difficulty: 2,
    description: '身体后坐，双手回拉如关门落闩，再向前按出。动作含蓄内敛，如道人回身将门栓插好。体现太极的引进落空、化而后发之理。',
    breathing: '后坐回拉时吸气，前按发力时呼气。呼吸深长，气沉丹田。',
    commonMistakes: [
      { title: '后仰', wrong: '上身后仰失去重心', correct: '后坐时保持中正，不仰不俯' },
      { title: '回拉生硬', wrong: '手臂僵硬回拉', correct: '以腰带手，松柔回引' }
    ],
    coverImage: '',
    duration: 12,
    sortOrder: 7
  },
  {
    _id: 'move_08',
    name: '推山填海',
    category: 'nine_forms',
    difficulty: 3,
    description: '双手向前推出，气势雄浑，如推动大山、填平沧海。弓步前推，力从脚起，主宰于腰，形于手指。此势为发力推按之法，体现太极整劲和气势。',
    breathing: '蓄劲时吸气，推掌时呼气发力。呼气要短促有力，气贯双掌。',
    commonMistakes: [
      { title: '只用手推', wrong: '手臂孤立前推，没有整劲', correct: '力从脚起，经腿到腰，传于手臂' },
      { title: '身体前倾', wrong: '上身过度前俯', correct: '保持立身中正，劲往前走人不往前扑' }
    ],
    coverImage: '',
    duration: 12,
    sortOrder: 8
  },
  {
    _id: 'move_09',
    name: '收势（正气长存）',
    category: 'nine_forms',
    difficulty: 1,
    description: '双手缓缓下落，收脚并拢，回归无极之态。气息调匀，正气充盈于体内。此势为全套之终，收天地之气归于丹田，正气长存，身心圆满。',
    breathing: '双手下落时缓缓呼气，收势后自然呼吸片刻。意守丹田，气息平和。',
    commonMistakes: [
      { title: '收势过快', wrong: '匆忙结束，气息未平', correct: '动作缓慢，待气息调匀后再收' },
      { title: '神气涣散', wrong: '收势后立即走动说话', correct: '静立片刻，体会气感，再缓缓收功' }
    ],
    coverImage: '',
    duration: 10,
    sortOrder: 9
  }
];

export const routines = [
  {
    _id: 'routine_01',
    name: '武当太极九势',
    description: '武当派基础太极套路，共九个招式，动作简洁，适合初学者入门。全套演练约2分钟。',
    difficulty: 2,
    moves: moves.map(m => ({ moveId: m._id, sortOrder: m.sortOrder })),
    totalDuration: 97
  }
];

export const spots = [
  {
    _id: 'spot_01',
    name: '金殿',
    description: '武当山金顶，海拔1612米，明代铜铸鎏金大殿，是中国现存最大的铜铸建筑。',
    detail: '金殿位于武当山主峰天柱峰顶端，建于明永乐十四年（1416年），全为铜铸鎏金仿木结构，重约80吨。殿内供奉真武大帝铜像，左右侍立金童玉女及水火二将。金殿虽经五百余年风雨雷电，至今金碧辉煌，是中国古代建筑和铸造工艺的瑰宝。',
    location: { latitude: 32.4047, longitude: 111.0003 },
    category: 'palace',
    visitDuration: 40,
    rating: 4.8,
    openTime: '07:00-17:30',
    ticket: '含在武当山大门票内（大门票130元）',
    tips: '建议清晨登顶观日出，冬季需注意防寒保暖。',
    images: ['https://picsum.photos/seed/jindian1/400/250', 'https://picsum.photos/seed/jindian2/400/250', 'https://picsum.photos/seed/jindian3/400/250']
  },
  {
    _id: 'spot_02',
    name: '南岩宫',
    description: '武当山36岩中最美的一岩，龙头香闻名天下，是武当山最险峻的建筑群。',
    detail: '南岩宫始建于唐代，扩建于元明，是武当山最美的人文与自然融合的景观。南岩绝壁上的龙头香是武当山最著名的奇观之一——香客需跨越万丈深渊在龙头上焚香祈福，惊险异常。现存建筑有天乙真庆宫石殿、两仪殿等，雕梁画栋，巧夺天工。',
    location: { latitude: 32.4012, longitude: 111.0045 },
    category: 'palace',
    visitDuration: 50,
    rating: 4.7,
    openTime: '07:00-17:00',
    ticket: '含在武当山大门票内',
    tips: '龙头香现已禁止攀爬，请在观景台观赏拍照。',
    images: ['https://picsum.photos/seed/nanyan1/400/250', 'https://picsum.photos/seed/nanyan2/400/250']
  },
  {
    _id: 'spot_03',
    name: '紫霄宫',
    description: '武当山保存最完整的宫殿建筑群，紫霄福地，是武当山道教活动中心。',
    detail: '紫霄宫背倚展旗峰，面对照壁峰，是武当山现存最完整的宫殿建筑群之一，被列为全国重点文物保护单位。始建于宋宣和年间，明永乐十年扩建。紫霄大殿为重檐歇山式建筑，殿内供奉真武大帝及文武仙尊。此处是武当山道教法事活动的主要场所。',
    location: { latitude: 32.3998, longitude: 111.0078 },
    category: 'palace',
    visitDuration: 30,
    rating: 4.6,
    openTime: '07:30-17:00',
    ticket: '含在武当山大门票内',
    tips: '如遇道教法会，可观赏道乐演奏，非常值得。',
    images: ['https://picsum.photos/seed/zixiao1/400/250', 'https://picsum.photos/seed/zixiao2/400/250']
  },
  {
    _id: 'spot_04',
    name: '太子坡',
    description: '复真观，传说太子修仙之处。一柱十二梁的建筑奇观令人叹为观止。',
    detail: '太子坡又名复真观，相传为真武大帝少年修道之处。整座建筑依山就势，高低错落，最著名的是"一柱十二梁"的建筑奇观——一根主柱上架起十二根横梁，构思精巧，为古建筑中罕见。九曲黄河墙蜿蜒曲折，漫步其中如入迷宫，充分体现了道教建筑"道法自然"的理念。',
    location: { latitude: 32.3956, longitude: 111.0089 },
    category: 'heritage',
    visitDuration: 25,
    rating: 4.5,
    openTime: '07:30-17:00',
    ticket: '含在武当山大门票内',
    tips: '九曲黄河墙非常适合拍照，建议留出时间慢慢欣赏。',
    images: ['https://picsum.photos/seed/taizipo1/400/250', 'https://picsum.photos/seed/taizipo2/400/250']
  },
  {
    _id: 'spot_05',
    name: '逍遥谷',
    description: '自然景观优美，有猕猴嬉戏，是武当山生态旅游的绝佳去处。',
    detail: '逍遥谷全长约8公里，是武当山最美的自然生态景观区。谷内溪水潺潺，林木葱郁，常有野生猕猴出没嬉戏。沿溪而行，可见武当武术表演、道家养生讲座等文化活动。谷中还有一座天然太极图——两条溪流交汇形成阴阳鱼图案，令人惊叹大自然的鬼斧神工。',
    location: { latitude: 32.3975, longitude: 111.0034 },
    category: 'nature',
    visitDuration: 35,
    rating: 4.4,
    openTime: '08:00-16:30',
    ticket: '含在武当山大门票内',
    tips: '注意看管好随身物品，猕猴可能会抢夺食物和小物件。',
    images: ['https://picsum.photos/seed/xiaoyao1/400/250', 'https://picsum.photos/seed/xiaoyao2/400/250']
  }
];

export const routes = [
  {
    _id: 'route_01',
    name: '经典路线',
    description: '金殿 → 南岩宫 → 紫霄宫',
    type: 'classic',
    spots: ['spot_01', 'spot_02', 'spot_03'],
    totalDuration: 180,
    totalDistance: 5200
  },
  {
    _id: 'route_02',
    name: '深度路线',
    description: '金殿 → 南岩宫 → 紫霄宫 → 太子坡',
    type: 'deep',
    spots: ['spot_01', 'spot_02', 'spot_03', 'spot_04'],
    totalDuration: 240,
    totalDistance: 8000
  },
  {
    _id: 'route_03',
    name: '全景路线',
    description: '金殿 → 南岩宫 → 逍遥谷 → 紫霄宫 → 太子坡',
    type: 'full',
    spots: ['spot_01', 'spot_02', 'spot_05', 'spot_03', 'spot_04'],
    totalDuration: 360,
    totalDistance: 12000
  }
];

export const badges = [
  { _id: 'badge_01', name: '初学乍练', icon: '🌱', condition: { type: 'totalCheckIns', value: 1 } },
  { _id: 'badge_02', name: '三日入门', icon: '🌿', condition: { type: 'streak', value: 3 } },
  { _id: 'badge_03', name: '七日坚持', icon: '🌳', condition: { type: 'streak', value: 7 } },
  { _id: 'badge_04', name: '月度之星', icon: '⭐', condition: { type: 'streak', value: 30 } },
  { _id: 'badge_05', name: '九势初成', icon: '🏆', condition: { type: 'movesCompleted', value: 9 } },
  { _id: 'badge_06', name: '太极新星', icon: '🌟', condition: { type: 'totalCheckIns', value: 50 } },
  { _id: 'badge_07', name: '太极达人', icon: '💫', condition: { type: 'totalCheckIns', value: 100 } },
  { _id: 'badge_08', name: '武当传人', icon: '🐉', condition: { type: 'totalCheckIns', value: 365 } }
];

/** 附近设施数据 */
export const facilities = [
  { _id: 'fac_01', name: '金顶卫生间', type: 'restroom', location: { latitude: 32.4045, longitude: 111.0005 } },
  { _id: 'fac_02', name: '金顶休息区', type: 'rest', location: { latitude: 32.4043, longitude: 111.0001 } },
  { _id: 'fac_03', name: '南岩宫卫生间', type: 'restroom', location: { latitude: 32.4010, longitude: 111.0047 } },
  { _id: 'fac_04', name: '南岩小吃街', type: 'food', location: { latitude: 32.4008, longitude: 111.0043 } },
  { _id: 'fac_05', name: '紫霄宫卫生间', type: 'restroom', location: { latitude: 32.3996, longitude: 111.0080 } },
  { _id: 'fac_06', name: '紫霄茶室', type: 'food', location: { latitude: 32.3997, longitude: 111.0076 } },
  { _id: 'fac_07', name: '太子坡休息亭', type: 'rest', location: { latitude: 32.3954, longitude: 111.0091 } },
  { _id: 'fac_08', name: '逍遥谷小卖部', type: 'food', location: { latitude: 32.3973, longitude: 111.0036 } },
  { _id: 'fac_09', name: '逍遥谷卫生间', type: 'restroom', location: { latitude: 32.3974, longitude: 111.0032 } }
];

/** 设施类型配置 */
export const facilityTypes = {
  restroom: { name: '洗手间', color: '#4a7dbd', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M6 20h4v-8H4v8h2zm6 0h4V4h-4v16zm-6-16h4V2H4v2z"/></svg>' },
  rest: { name: '休息区', color: '#4a9f6b', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M4 18v2h16v-2H4zm0-4h16c1 0 2 1 2 2v2H2v-2c0-1 1-2 2-2zm0-6h16c2 0 4 1.5 4 3s-2 3-4 3H4c-2 0-4-1.5-4-3s2-3 4-3z"/></svg>' },
  food: { name: '餐饮', color: '#c4863a', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>' }
};

/** 招式对应的 emoji 图标映射 */
export const moveIcons = {
  'move_01': '🧘', 'move_02': '☯️', 'move_03': '🐎', 'move_04': '🐦',
  'move_05': '🍑', 'move_06': '🐉', 'move_07': '🚪', 'move_08': '⛰️', 'move_09': '🙏'
};

/** 景点类别图标映射 */
export const spotCategoryIcons = {
  palace: '🏛️',
  nature: '🌳',
  heritage: '🏣'
};

/** 景点类别颜色映射 */
export const spotCategoryColors = {
  palace: '#b8322a',
  nature: '#2d5a3d',
  heritage: '#4a7dbd'
};

/** 文章数据 */
export const articles = [
  {
    _id: 'article_01',
    title: '武当山：道教第一名山的千年传奇',
    category: 'history',
    summary: '武当山，古称太和山，位于湖北省十堰市境内，是中国著名的道教圣地。自东汉以来，武当山便是修仙炼道之所，历经唐宋元明各代营建，最终形成了规模宏大的古建筑群。',
    content: '武当山，古称太和山，位于湖北省十堰市境内，方圆八百里，高峰林立，主峰天柱峰海拔1612米。是中国著名的道教圣地，被誉为"道教第一名山"。\n\n武当山的道教历史可追溯至东汉时期。据记载，阴长生、吕洞宾等著名道士都曾在此修炼。唐代时，武当山被封为"太和山"，开始大规模修建道观。\n\n宋代是武当山道教发展的重要时期。真武大帝信仰在此时期逐渐兴盛，武当山成为真武大帝的道场。\n\n明代是武当山的鼎盛时期。永乐皇帝朱棣为感谢真武大帝保佑他夺取皇位，征调三十万军民工匠，历时十二年，在武当山修建了规模宏大的宫观建筑群。这些建筑依山就势，错落有致，绵延140华里，形成了"五里一庵十里宫，丹墙翠瓦望玲珑"的壮观景象。\n\n2024年，武当山古建筑群被联合国教科文组织列入《世界遗产名录》，成为中国第一个被列入世界文化遗产的道教名山。',
    author: '武当文化研究会',
    date: '2026-05-10',
    readTime: 5,
    tags: ['道教', '历史', '世界遗产']
  },
  {
    _id: 'article_02',
    title: '太极拳的起源与道家哲学',
    category: 'philosophy',
    summary: '太极拳是中国传统武术的瑰宝，其核心理念源于道家哲学。阴阳相济、刚柔并存、以柔克刚——这些道家思想在太极拳的一招一式中得到了完美的体现。',
    content: '太极拳是中国传统武术中最具哲学内涵的拳种，它的诞生和发展深深植根于道家哲学的土壤之中。\n\n太极拳的哲学基础主要来自《道德经》和《易经》。老子说："天下之至柔，驰骋天下之至坚。"这正是太极拳"以柔克刚"理念的源头。《易经》中的阴阳变化理论，则构成了太极拳阴阳相济、动静结合的核心思想。\n\n在太极拳中，每一个动作都蕴含着深刻的哲学含义：\n\n**阴阳互根**：太极拳讲究"阴不离阳，阳不离阴"。左手为阳则右手为阴，上为阳则下为阴，动为阳则静为阴。阴阳相互依存，相互转化。\n\n**以柔克刚**：太极拳不主张以力对力，而是通过引进落空、借力打力的方式化解对方的攻击。这体现了道家"上善若水"的智慧——水看似柔弱，却能穿石裂岩。\n\n**天人合一**：太极拳追求人与自然的和谐统一。练习时要求"以意导气，以气运身"，使人体小宇宙与天地大宇宙相通相应。\n\n武当太极拳更强调"以静制动、以慢制快、以巧制拙"，充分体现了道家"无为而无不为"的哲学精髓。练习太极拳不仅是强身健体，更是一种修身养性、体悟大道的方式。',
    author: '张三丰太极研究会',
    date: '2026-05-08',
    readTime: 6,
    tags: ['太极', '哲学', '道家']
  },
  {
    _id: 'article_03',
    title: '武当派：内家拳的正宗传承',
    category: 'school',
    summary: '武当派是中国武术的重要流派，以张三丰为祖师，讲究内修外练、以气御力。武当武术与少林武术并称"北崇少林、南尊武当"，是中华武术的两大支柱。',
    content: '武当派是中国武术史上最重要的流派之一，与少林派并称为中国武术的两大宗脉。民间素有"北崇少林、南尊武当"之说。\n\n**祖师张三丰**\n\n张三丰，名君宝，号三丰，是武当派的开山祖师。据《明史》记载，张三丰为辽东懿州人，身材魁伟，龟形鹤骨，大耳圆目。他曾任县令，后弃官入道，云游天下，最终归隐武当山。\n\n张三丰在武当山修炼期间，观察鹊蛇相斗，悟出了以柔克刚的拳理，创立了太极拳。此后又创编了形意拳、八卦掌等内家拳法，奠定了武当武术的基础。\n\n**武当武术的特点**\n\n武当武术属于内家拳，与外家拳（如少林拳）有着本质的区别：\n\n1. **以静制动**：不主动攻击，而是等待对手出手后借力打力。\n2. **以柔克刚**：不用蛮力，而是通过巧妙的身法和手法化解对方的力量。\n3. **以气御力**：强调内气的修炼，以意导气，以气运身，劲力由内而外发出。\n4. **养生为本**：武当武术不仅追求技击效果，更注重养生延年。\n\n**武当武术的传承**\n\n武当武术经过数百年的发展，形成了丰富的拳种体系。主要包括：太极拳（张三丰太极十三势）、形意拳、八卦掌、武当剑、玄武棍等。其中武当太极九势是入门基础套路，动作简洁，适合初学者。',
    author: '武当武术协会',
    date: '2026-05-05',
    readTime: 7,
    tags: ['武当派', '内家拳', '张三丰']
  },
  {
    _id: 'article_04',
    title: '张三丰：从道士到太极宗师',
    category: 'master',
    summary: '张三丰是中国武术史上最传奇的人物之一。他弃官入道、云游天下、创立太极拳，被后世尊为武当派祖师和太极拳创始人。',
    content: '张三丰，名全一，一名君宝，号三丰，是活跃于元末明初的著名道士和武术家，被后世尊为武当派祖师和太极拳创始人。\n\n**弃官入道**\n\n张三丰早年曾在中山博陵县任县令，但对仕途并不热衷。一日偶遇道教中人，深感道法玄妙，遂弃官出家，开始了云游修道的生涯。他先后到过宝鸡金台观、武当山等地修炼。\n\n**武当悟道**\n\n张三丰归隐武当山后，在南岩宫修炼。传说他在观察鹊蛇相斗时大受启发——喜鹊从上方攻击，长蛇以柔韧的身法闪避，并趁机反击。张三丰由此悟出了"以柔克刚、以静制动"的拳理，创立了太极拳。\n\n**内丹修炼**\n\n张三丰不仅是一位武术大师，更是一位内丹修炼的高人。他主张"性命双修"，即同时修炼精神（性）和身体（命）。他的内丹功法包括：\n\n- 站桩功：培养内气，增强体质\n- 太极拳：以拳悟道，动静结合\n- 打坐冥想：修炼心性，明心见性\n\n**传说与影响**\n\n关于张三丰的传说非常多。最著名的是他活了二百多岁，容颜不老。虽然这些传说未必完全可信，但足以说明张三丰养生功法的效果之佳。\n\n张三丰对中国武术和道教文化的影响极为深远。他创立的太极拳如今已传播到全世界，成为最受人们喜爱的健身运动之一。2020年，太极拳被联合国教科文组织列入人类非物质文化遗产代表作名录。',
    author: '武当文化研究会',
    date: '2026-05-01',
    readTime: 8,
    tags: ['张三丰', '太极宗师', '道教']
  },
  {
    _id: 'article_05',
    title: '武当山古建筑群：天人合一的建筑奇迹',
    category: 'history',
    summary: '武当山古建筑群是中国古代建筑艺术的杰作，九宫八观、三十六庵堂、七十二岩庙，绵延140华里，完美诠释了"道法自然"的建筑理念。',
    content: '武当山古建筑群是中国古代建筑艺术的巅峰之作，1994年被列入《世界文化遗产名录》。\n\n**规模与布局**\n\n武当山古建筑群绵延140华里，包括9宫、8观、36庵堂、72岩庙、39桥、12亭，共计33座建筑群。这些建筑充分利用了武当山的地形特点，或建于峰顶，或嵌于峭壁，或隐于林间，完美地体现了道家"道法自然、天人合一"的理念。\n\n**金殿——铜铸艺术的巅峰**\n\n金殿位于天柱峰顶端，海拔1612米，是武当山古建筑群的核心。金殿为铜铸鎏金仿木结构，面阔进深均为三间，高5.54米，宽4.4米，深3.15米。殿内供奉真武大帝铜像及金童玉女、水火二将。整座金殿不用一钉一铆，完全靠榫卯结构拼接而成，体现了中国古代高超的铸造工艺。\n\n**紫霄宫——道教活动中心**\n\n紫霄宫是武当山保存最完整的宫殿建筑群，也是武当山道教活动的主要场所。紫霄大殿为重檐歇山式木结构建筑，面阔五间，殿内供奉真武大帝。紫霄宫的选址极为讲究，背倚展旗峰，面对照壁峰，左右群山环抱，溪水环绕，被古人誉为"紫霄福地"。\n\n**南岩宫——悬崖上的奇迹**\n\n南岩宫建于悬崖绝壁之上，是武当山最险峻的建筑群。最著名的天乙真庆宫石殿完全在悬崖上开凿而成，殿前的龙头香更是令人叹为观止。\n\n武当山古建筑群不仅是中国古代建筑的瑰宝，更是道家"天人合一"哲学思想的物质载体，具有极高的历史、艺术和科学价值。',
    author: '世界遗产研究中心',
    date: '2026-04-28',
    readTime: 7,
    tags: ['古建筑', '世界遗产', '明代']
  },
  {
    _id: 'article_06',
    title: '道家养生：武当山上的长寿秘诀',
    category: 'philosophy',
    summary: '武当山道教养生文化源远流长，融合了太极拳、内丹功、道医药等多种养生方法，追求身心和谐、延年益寿。',
    content: '武当山道教养生文化是中国传统养生文化的重要组成部分，它融合了道家哲学、中医理论和武术修炼，形成了一套完整的养生体系。\n\n**养生三宝：精、气、神**\n\n道家认为，精、气、神是人体的三宝。养生的核心就是保养这三宝：\n\n- **保精**：节欲养精，不妄泄精气\n- **养气**：调息养气，呼吸深长匀细\n- **凝神**：静心凝神，排除杂念\n\n**太极拳养生**\n\n太极拳是武当养生体系中最重要的组成部分。练习太极拳可以：\n\n1. 调节神经系统：太极拳要求"用意不用力"，长期练习可以提高神经系统的调节能力\n2. 增强心肺功能：深长的腹式呼吸可以增强肺活量，改善心肺功能\n3. 改善消化系统：太极拳的腰部旋转可以按摩内脏，促进消化\n4. 增强免疫力：研究显示，长期练习太极拳可以显著提高人体免疫力\n\n**站桩功**\n\n站桩是武当养生的基础功法。通过静立不动的姿势，培养内气，增强体质。基本要领是：两脚与肩同宽，膝微屈，双手环抱于胸前，舌抵上腭，呼吸自然。初练5分钟，逐渐增加到30分钟。\n\n**道医药**\n\n武当山道教还发展出了独特的道医药体系。武当山上生长着丰富的中草药资源，道人们利用这些草药配制了各种养生药方，如武当养生茶、太极养生酒等。',
    author: '武当养生研究院',
    date: '2026-04-25',
    readTime: 6,
    tags: ['养生', '道家', '健康']
  }
];

/** 文章分类信息 */
export const articleCategories = {
  history: { name: '武当历史', color: '#b8322a' },
  philosophy: { name: '道家哲学', color: '#d4a574' },
  school: { name: '武术流派', color: '#2d5a3d' },
  master: { name: '名家故事', color: '#4a7dbd' }
};

/** 社区动态 mock 数据 */
export const communityPosts = [
  {
    _id: 'post_01',
    userId: 'user_demo',
    nickname: '太极小王',
    avatar: '',
    content: '今天终于把揽雀尾的四劲连贯起来了！掤捋挤按一气呵成，感觉太极越来越有意思了。坚持打卡第30天！',
    tags: ['太极打卡', '武当太极'],
    likes: 23,
    comments: 5,
    liked: false,
    createdAt: '2026-05-25T08:30:00',
    checkin: { duration: 45, moves: ['揽雀尾'] }
  },
  {
    _id: 'post_02',
    userId: 'user_demo2',
    nickname: '武当问道',
    avatar: '',
    content: '第一次登武当山金殿，日出真的太美了！站在天柱峰顶，云海翻涌，金殿在阳光下熠熠生辉。不愧是道教第一名山。',
    tags: ['武当山', '金殿'],
    likes: 45,
    comments: 12,
    liked: false,
    createdAt: '2026-05-24T06:15:00',
    checkin: null
  },
  {
    _id: 'post_03',
    userId: 'user_demo3',
    nickname: '养生达人',
    avatar: '',
    content: '坚持站桩一个月了，从最初的5分钟到现在能站20分钟。明显感觉睡眠质量提高了，白天精神也好了很多。太极养生真的有效！',
    tags: ['站桩', '养生'],
    likes: 18,
    comments: 3,
    liked: false,
    createdAt: '2026-05-23T21:00:00',
    checkin: { duration: 20, moves: ['站桩'] }
  },
  {
    _id: 'post_04',
    userId: 'user_demo4',
    nickname: '太极新手',
    avatar: '',
    content: '请问野马分鬃的弓步，前膝到底能不能超过脚尖？看视频教学说不能，但公园里好多老师傅都超过的。求高手解答！',
    tags: ['太极问答', '野马分鬃'],
    likes: 8,
    comments: 15,
    liked: false,
    createdAt: '2026-05-22T15:30:00',
    checkin: null
  },
  {
    _id: 'post_05',
    userId: 'user_demo5',
    nickname: '道法自然',
    avatar: '',
    content: '今天在紫霄宫参加了道乐演奏，道长们演奏的道教音乐悠扬动听，让人心旷神怡。推荐大家来武当山一定要体验一下！',
    tags: ['武当山', '紫霄宫', '道教文化'],
    likes: 32,
    comments: 7,
    liked: false,
    createdAt: '2026-05-21T10:45:00',
    checkin: null
  }
];

/** 社区评论 mock 数据 */
export const communityComments = {
  'post_01': [
    { _id: 'cmt_01', nickname: '太极老李', content: '恭喜！揽雀尾是太极核心招式，练好了后面学什么都快。', createdAt: '2026-05-25T09:00:00' },
    { _id: 'cmt_02', nickname: '武当问道', content: '我也在练这个，掤劲总是找不到感觉，有什么诀窍吗？', createdAt: '2026-05-25T09:30:00' },
    { _id: 'cmt_03', nickname: '太极小王', content: '@武当问道 关键是松肩坠肘，手臂保持弧形，想象抱着一个气球。', createdAt: '2026-05-25T10:00:00' },
    { _id: 'cmt_04', nickname: '养生达人', content: '30天打卡太厉害了，向你学习！', createdAt: '2026-05-25T12:00:00' },
    { _id: 'cmt_05', nickname: '道法自然', content: '坚持就是胜利，加油！', createdAt: '2026-05-25T14:00:00' }
  ],
  'post_02': [
    { _id: 'cmt_06', nickname: '太极小王', content: '好羡慕！我也要去武当山看日出！', createdAt: '2026-05-24T08:00:00' },
    { _id: 'cmt_07', nickname: '养生达人', content: '金殿日出确实震撼，推荐冬天去，云海概率更高。', createdAt: '2026-05-24T09:00:00' }
  ],
  'post_03': [
    { _id: 'cmt_08', nickname: '太极老李', content: '站桩是基本功，坚持下去会有很大收获。', createdAt: '2026-05-23T22:00:00' }
  ],
  'post_04': [
    { _id: 'cmt_09', nickname: '太极老李', content: '传统要求膝盖不超过脚尖，主要是为了保护膝关节。但有些流派允许微超，关键是膝盖方向要与脚尖一致。', createdAt: '2026-05-22T16:00:00' },
    { _id: 'cmt_10', nickname: '养生达人', content: '初学者建议严格遵守不过脚尖的规则，等腿部力量强了再调整。', createdAt: '2026-05-22T17:00:00' }
  ],
  'post_05': [
    { _id: 'cmt_11', nickname: '太极新手', content: '道乐演奏真的很好听吗？下次去一定要看看！', createdAt: '2026-05-21T11:00:00' }
  ]
};
