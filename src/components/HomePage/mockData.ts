export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  isNew?: boolean
  isFeatured?: boolean
  isOnSale?: boolean
}

export interface Category {
  id: string
  name: string
  image: string
  itemCount: number
}

export const products: Product[] = [
  {
    id: "prod1",
    name: "[KAHI] Wrinkle Bounce Multi Balm 9g",
    price: 599.99,
    image: "https://img8.yeshen.cc/vn-alibaba/41/45/41b1c10a-5363-45b6-828a-f4123a536645.png",
    category: "Sức khỏe & Làm đẹp",
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: "prod2",
    name: "BlueWow Lapel Headset Microphone Windscreen",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://img2.yeshen.cc/vn-alibaba/44/66/4457cd95-7ef8-4b81-bc5e-881add046166.jpeg",
    category: "Thiết bị điện tử",
    rating: 4.2,
    isOnSale: true,
  },
  {
    id: "prod3",
    name: "ASICS Men GEL-JOG MC Sportstyle Shoes",
    price: 89.99,
    image: "https://img3.yeshen.cc/vn-alibaba/8e/89/8e7dd0d1-ad69-4578-8574-3d9082ccb389.jpeg",
    category: "Thời trang nam",
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: "prod4",
    name: "Merries Tape Diapers S82s x 4 packs",
    price: 19.99,
    image: "https://img2.yeshen.cc/vn-alibaba/fe/cf/fe320701-a928-45cd-9171-7b72a150b5cf.jpeg",
    category: "Trẻ em & Đồ chơi",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "prod5",
    name: "Luoke Sport Swimwear Shorts Black Swimsuit",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://img8.yeshen.cc/vn-alibaba/aa/73/aa0cb86a-b12f-413d-93fa-6e56c5f68573.jpeg",
    category: "Thời trang nữ và phụ kiện",
    rating: 4.4,
    isOnSale: true,
  },
  {
    id: "prod6",
    name: "Fairtex TP4 Compact Thigh Pads",
    price: 49.99,
    image: "https://img8.yeshen.cc/vn-alibaba/27/e1/27e061cf-82b2-4ebc-a1d7-3e102ed33ae1.jpeg",
    category: "Đồ dùng cho thú cưng",
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: "prod7",
    name: "HP ProDesk 400 G3 Mini Desktop Core i7",
    price: 315.0,
    image: "https://img0.yeshen.cc/vn-alibaba/d5/c5/d5b0b017-7cef-485a-8b99-9c12edd480c5.jpeg",
    category: "Thiết bị điện tử",
    rating: 4.9,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prod8",
    name: "Dior Addict Eau Fraiche for Women 50ml",
    price: 55.0,
    originalPrice: 99.99,
    image: "https://img7.yeshen.cc/vn-alibaba/e2/60/e2726171-ea61-42a6-ad7d-96fc2e6a7960.jpeg",
    category: "Sức khỏe & Làm đẹp",
    rating: 4.3,
    isOnSale: true,
  },
]

export const banners = [
  {
    id: "banner1",
    title: "Khuyến mãi mùa hè",
    subtitle: "Giảm giá lên đến 50%",
    image: "https://img5.yeshen.cc/vn-alibaba/dc/59/dcdd2db638bed31a8c0c19d6753b63ca7a319459.jpg",
    buttonLink: "/sale",
    color: "#afa8a1"
  },
  {
    id: "banner2",
    title: "Bộ sưu tập mới",
    subtitle: "Khám phá các sản phẩm mới nhất",
    image: "https://img9.yeshen.cc/vn-alibaba/9c/2e/9cd5ae8d634077c46e52d8128b63ac23b60dc22e.jpg",
    buttonLink: "/new-arrivals",
    color: "#7d593f"
  },
  {
    id: "banner3",
    title: "Miễn phí vận chuyển",
    subtitle: "Cho đơn hàng trên $25",
    image: "https://img0.yeshen.cc/vn-alibaba/9d/37/9dfe7a5905535ae120a03806e6f1f6a04c40df37.jpg",
    buttonLink: "/shipping",
    color: "#5f5f5f"
  },
]

// TikTok mock user/video data
export interface UserData {
  id: string;
  name: string;
  avatar: string;
  isFollowing: boolean;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  username: string;
  userHandle: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  isBookmarked: boolean;
  hashtags: string[];
  musicInfo?: string;
  location?: string;
  user: UserData;
}

export const mockVideos: VideoData[] = [
  {
    id: '1',
    title: 'Sáng mua heo 10tr bán 10tr200. Chiều mua 11tr bán 12tr về đưa tiền cho vợ vợ cứ bảo lỗ, lỗ thật ko ae:))',
    description: 'Sáng mua heo 10tr bán 10tr200. Chiều mua 11tr bán 12tr về đưa tiền cho vợ vợ cứ bảo lỗ, lỗ thật ko ae:))',
    username: 'dongvathoangda66',
    userHandle: '@dongvathoangda66',
    likes: 42300,
    comments: 7962,
    shares: 4230,
    timestamp: '2-2025 TO 16:54:08',
    isLiked: false,
    isBookmarked: false,
    hashtags: ['#GreenCreator', '#VinWonders', '#WonderSummer2025'],
    musicInfo: '♫ Đạo Làm Con - Saka Trương Tuyền',
    location: 'VINPEARL SAFARI PHU QUOC - Phu Quoc',
    user: {
      id: 'u1',
      name: 'Nguyễn Văn A',
      avatar: '/images/avatarDefault.png',
      isFollowing: false,
    },
  },
  {
    id: '2',
    title: 'Một ngày dạo chơi ở VinWonders, trời xanh mây trắng, mood quá chill!',
    description: 'Video mới 2  #video #trending #new | Cảnh đẹp và không khí tuyệt vời',
    username: 'user_2',
    userHandle: '@user_2',
    likes: 530000,
    comments: 4344,
    shares: 187800,
    timestamp: new Date().toLocaleString(),
    isLiked: false,
    isBookmarked: false,
    hashtags: ['#video', '#trending', '#new'],
    musicInfo: 'Original Sound',
    location: 'Hà Nội, Việt Nam',
    user: {
      id: 'u2',
      name: 'Trần Thị B',
      avatar: '/images/avatarDefault.png',
      isFollowing: true,
    },
  },
  {
    id: '3',
    title: 'Review nhanh: Quán cà phê mới mở, bánh ngon nước ổn, decor xịn!',
    description: 'Đi cà phê cuối tuần #review #coffee #new | Quán có không gian đẹp và nhiều góc chụp hình',
    username: 'user_3',
    userHandle: '@user_3',
    likes: 12800,
    comments: 980,
    shares: 21400,
    timestamp: new Date().toLocaleString(),
    isLiked: false,
    isBookmarked: false,
    hashtags: ['#review', '#coffee', '#lifestyle'],
    musicInfo: 'Acoustic Chill',
    location: 'Đà Nẵng, Việt Nam',
    user: {
      id: 'u3',
      name: 'Lê Văn C',
      avatar: '/images/avatarDefault.png',
      isFollowing: false,
    },
  },
  {
    id: '4',
    title: 'Gym day: Full body workout cho ngày lười biếng ',
    description: 'Chia sẻ bài tập nhanh gọn  #gym #workout #health | 30 phút đủ đốt năng lượng',
    username: 'user_4',
    userHandle: '@user_4',
    likes: 7600,
    comments: 456,
    shares: 3200,
    timestamp: new Date().toLocaleString(),
    isLiked: false,
    isBookmarked: false,
    hashtags: ['#gym', '#workout', '#health'],
    musicInfo: 'Trap Beat',
    location: 'Hồ Chí Minh, Việt Nam',
    user: {
      id: 'u4',
      name: 'Phạm Thị D',
      avatar: '/images/avatarDefault.png',
      isFollowing: true,
    },
  },
  {
    id: '5',
    title: 'Chuyến đi phượt Đà Lạt cùng hội bạn thân!',
    description: 'Đà Lạt mùa này đẹp quá, ai đi cùng không? #dalat #travel',
    username: 'user_5',
    userHandle: '@user_5',
    likes: 21000,
    comments: 1500,
    shares: 5000,
    timestamp: new Date().toLocaleString(),
    isLiked: false,
    isBookmarked: false,
    hashtags: ['#dalat', '#travel', '#friends'],
    musicInfo: 'Chill Vibes',
    location: 'Đà Lạt, Việt Nam',
    user: {
      id: 'u5',
      name: 'Ngô Minh E',
      avatar: '/images/avatarDefault.png',
      isFollowing: false,
    },
  },
  {
    id: '6',
    title: 'Bí quyết học giỏi tiếng Anh mỗi ngày!',
    description: 'Chia sẻ cách học tiếng Anh hiệu quả #english #study',
    username: 'user_6',
    userHandle: '@user_6',
    likes: 35000,
    comments: 2200,
    shares: 8000,
    timestamp: new Date().toLocaleString(),
    isLiked: false,
    isBookmarked: false,
    hashtags: ['#english', '#study', '#tips'],
    musicInfo: 'Upbeat Motivation',
    location: 'Hà Nội, Việt Nam',
    user: {
      id: 'u6',
      name: 'Phan Thị F',
      avatar: '/images/avatarDefault.png',
      isFollowing: true,
    },
  },
];

// Additional mock data for tabs
export const mockFollowingVideos: VideoData[] = mockVideos.filter(v => v.user.isFollowing);

export interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: UserData;
  text: string;
  time: string;
  unread?: boolean;
}

export const mockActivityItems: ActivityItem[] = [
  { id: 'a1', type: 'like', user: mockVideos[1].user, text: 'đã thích video của bạn', time: '2h', unread: true },
  { id: 'a2', type: 'comment', user: mockVideos[3].user, text: 'đã bình luận: Tuyệt vời!', time: '5h' },
  { id: 'a3', type: 'follow', user: mockVideos[2].user, text: 'đã theo dõi bạn', time: '1d' },
];

export interface MessageThread {
  id: string;
  user: UserData;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

export const mockMessages: MessageThread[] = [
  { id: 'm1', user: mockVideos[1].user, lastMessage: 'Hẹn cuối tuần nhé!', timestamp: '09:24', unreadCount: 2 },
  { id: 'm2', user: mockVideos[3].user, lastMessage: 'Video mới hay quá!', timestamp: 'Hôm qua' },
  { id: 'm3', user: mockVideos[5].user, lastMessage: 'Bạn rảnh không?', timestamp: '2 ngày trước', unreadCount: 1 },
];

export interface LiveStream {
  id: string;
  title: string;
  viewerCount: number;
  host: UserData;
  thumbnail: string;
}

export const mockLiveStreams: LiveStream[] = [
  { id: 'l1', title: 'Du lịch Đà Lạt live', viewerCount: 1200, host: mockVideos[4].user, thumbnail: 'https://img7.yeshen.cc/vn-alibaba/9d/37/9dfe7a5905535ae120a03806e6f1f6a04c40df37.jpg' },
  { id: 'l2', title: 'Tập gym cùng mình', viewerCount: 860, host: mockVideos[3].user, thumbnail: 'https://img3.yeshen.cc/vn-alibaba/8e/89/8e7dd0d1-ad69-4578-8574-3d9082ccb389.jpeg' },
  { id: 'l3', title: 'Cafe talk & chill', viewerCount: 530, host: mockVideos[2].user, thumbnail: 'https://img5.yeshen.cc/vn-alibaba/dc/59/dcdd2db638bed31a8c0c19d6753b63ca7a319459.jpg' },
];

export const mockFollowingAccounts = [
  { username: 'gocnuochoajop', displayName: 'Góc Nước Hoa Jop' },
  { username: 'trapgirl si tình', displayName: 'Trapgirl Si Tình' },
  { username: 'Outfits Đẹp Trai', displayName: 'Outfits Đẹp Trai' },
  { username: 'H mhieuuuu', displayName: 'H Mhieuuuu' },
  { username: 'Bau Krysie', displayName: 'Bau Krysie' },
];

export const currentUser: UserData = {
  id: 'me',
  name: 'Bạn Hiện Tại',
  avatar: '/images/avatarDefault.png',
  isFollowing: false,
};
