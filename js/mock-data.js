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
    location: { latitude: 32.4047, longitude: 111.0003 },
    category: 'palace',
    visitDuration: 40,
    rating: 4.8
  },
  {
    _id: 'spot_02',
    name: '南岩宫',
    description: '武当山36岩中最美的一岩，龙头香闻名天下，是武当山最险峻的建筑群。',
    location: { latitude: 32.4012, longitude: 111.0045 },
    category: 'palace',
    visitDuration: 50,
    rating: 4.7
  },
  {
    _id: 'spot_03',
    name: '紫霄宫',
    description: '武当山保存最完整的宫殿建筑群，紫霄福地，是武当山道教活动中心。',
    location: { latitude: 32.3998, longitude: 111.0078 },
    category: 'palace',
    visitDuration: 30,
    rating: 4.6
  },
  {
    _id: 'spot_04',
    name: '太子坡',
    description: '复真观，传说太子修仙之处。一柱十二梁的建筑奇观令人叹为观止。',
    location: { latitude: 32.3956, longitude: 111.0089 },
    category: 'heritage',
    visitDuration: 25,
    rating: 4.5
  },
  {
    _id: 'spot_05',
    name: '逍遥谷',
    description: '自然景观优美，有猕猴嬉戏，是武当山生态旅游的绝佳去处。',
    location: { latitude: 32.3975, longitude: 111.0034 },
    category: 'nature',
    visitDuration: 35,
    rating: 4.4
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
