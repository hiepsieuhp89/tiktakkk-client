export interface ExploreVideo {
    id: string;
    thumbnail: string;
    likes: string;
    username: string;
    displayName: string;
    overlayText?: string;
    isHotNews?: boolean;
    category: string;
}

export interface Category {
    id: string;
    label: string;
    isActive: boolean;
}

export const exploreCategories: Category[] = [
    { id: 'all', label: 'All', isActive: true },
    { id: 'singing-dancing', label: 'Singing & Dancing', isActive: false },
    { id: 'comedy', label: 'Comedy', isActive: false },
    { id: 'sports', label: 'Sports', isActive: false },
    { id: 'anime-comics', label: 'Anime & Comics', isActive: false },
    { id: 'relationship', label: 'Relationship', isActive: false },
    { id: 'shows', label: 'Shows', isActive: false },
    { id: 'lipsync', label: 'Lipsync', isActive: false },
    { id: 'daily-life', label: 'Daily Life', isActive: false },
    { id: 'beauty-care', label: 'Beauty Care', isActive: false },
    { id: 'games', label: 'Games', isActive: false },
];

export const exploreVideos: ExploreVideo[] = [
    {
        id: '1',
        thumbnail: '/images/product1.png',
        likes: '177.5K',
        username: 'plxhvn2',
        displayName: 'plxhvn2',
        overlayText: 'Tường ko ai thấy ta',
        isHotNews: true,
        category: 'daily-life'
    },
    {
        id: '2',
        thumbnail: '/images/product2.png',
        likes: '358.7K',
        username: 'miale0402',
        displayName: 'miale0402',
        category: 'beauty-care'
    },
    {
        id: '3',
        thumbnail: '/images/product3.png',
        likes: '214.5K',
        username: 'sonngohoangson8',
        displayName: 'sonngohoangson8',
        category: 'daily-life'
    },
    {
        id: '4',
        thumbnail: '/images/product4.png',
        likes: '388.6K',
        username: 'lf.duongfynn',
        displayName: 'lf.duongfynn',
        overlayText: 'Keep smiling',
        category: 'comedy'
    },
    {
        id: '5',
        thumbnail: '/images/product5.png',
        likes: '74.1K',
        username: 'bimatshow.biz',
        displayName: 'bimatshow.biz',
        overlayText: 'NHÌN SƠ QUA TƯỜNG MẤY ANH PHA-KE BÊN CAM KHÔNG Á, ĐỒNG CHÍ BINZ MẶC QUÂN PHỤC MÀ XĂM KÍN CẢ HAI TAY',
        category: 'comedy'
    },
    {
        id: '6',
        thumbnail: '/images/product6.png',
        likes: '46K',
        username: 'trn.fish1',
        displayName: 'trn.fish1',
        category: 'daily-life'
    },
    {
        id: '7',
        thumbnail: '/images/product7.png',
        likes: '108.7K',
        username: 'phoebetoong',
        displayName: 'phoebetoong',
        overlayText: 'Nếu gặp chồng đi với \'bồ\' thế này... bạn sẽ làm gì?',
        category: 'relationship'
    },
    {
        id: '8',
        thumbnail: '/images/product8.png',
        likes: '89.9K',
        username: 'minhcon197209',
        displayName: 'minhcon197209',
        category: 'comedy'
    },
    {
        id: '9',
        thumbnail: '/images/product9.png',
        likes: '109.9K',
        username: 'plxh.vn',
        displayName: 'plxh.vn',
        overlayText: 'mạng xã hội dc này',
        isHotNews: true,
        category: 'daily-life'
    },
    {
        id: '10',
        thumbnail: '/images/product10.png',
        likes: '392.1K',
        username: 'tolaaithiaa',
        displayName: 'tolaaithiaa',
        category: 'beauty-care'
    },
    {
        id: '11',
        thumbnail: '/images/product11.png',
        likes: '49K',
        username: 'sangvan4572',
        displayName: 'sangvan4572',
        overlayText: 'bạn có bao',
        category: 'daily-life'
    },
    {
        id: '12',
        thumbnail: '/images/product12.png',
        likes: '153.6K',
        username: 'leochoilienquan',
        displayName: 'leochoilienquan',
        overlayText: 'Miễn khống',
        category: 'games'
    }
];
