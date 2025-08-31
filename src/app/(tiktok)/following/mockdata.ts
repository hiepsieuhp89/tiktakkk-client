export interface FollowingVideo {
    id: string;
    title: string;
    userHandle: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isBookmarked: boolean;
    hashtags: string[];
    musicInfo: string;
    location?: string;
}

export const followingVideos: FollowingVideo[] = [
    {
        id: 'following-1',
        title: 'Cooking tutorial: How to make perfect pho #vietnamese #cooking #foodie',
        userHandle: '@chef_linh',
        likes: 1247,
        comments: 89,
        shares: 23,
        isLiked: true,
        isBookmarked: false,
        hashtags: ['#vietnamese', '#cooking', '#foodie', '#pho'],
        musicInfo: 'Original Sound - Chef Linh',
        location: 'Ho Chi Minh City, Vietnam'
    },
    {
        id: 'following-2',
        title: 'Dance challenge with my friends  #dance #friends #fun',
        userHandle: '@dance_crew_vn',
        likes: 892,
        comments: 156,
        shares: 45,
        isLiked: false,
        isBookmarked: true,
        hashtags: ['#dance', '#friends', '#fun', '#challenge'],
        musicInfo: 'Dance Monkey - Tones and I',
        location: 'Hanoi, Vietnam'
    },
    {
        id: 'following-3',
        title: 'Morning routine in Saigon  #morning #routine #saigon',
        userHandle: '@saigon_life',
        likes: 2156,
        comments: 234,
        shares: 67,
        isLiked: true,
        isBookmarked: false,
        hashtags: ['#morning', '#routine', '#saigon', '#vietnam'],
        musicInfo: 'Good Morning - Original Sound',
        location: 'Saigon, Vietnam'
    },
    {
        id: 'following-4',
        title: 'Street food tour in District 1  #streetfood #saigon #foodtour',
        userHandle: '@food_explorer',
        likes: 3456,
        comments: 445,
        shares: 123,
        isLiked: false,
        isBookmarked: true,
        hashtags: ['#streetfood', '#saigon', '#foodtour', '#vietnam'],
        musicInfo: 'Street Food Vibes - Food Explorer',
        location: 'District 1, Ho Chi Minh City'
    },
    {
        id: 'following-5',
        title: 'Motorbike ride through Hai Van Pass  #motorbike #travel #vietnam',
        userHandle: '@travel_vietnam',
        likes: 5678,
        comments: 678,
        shares: 234,
        isLiked: true,
        isBookmarked: true,
        hashtags: ['#motorbike', '#travel', '#vietnam', '#haivanpass'],
        musicInfo: 'Riding Free - Travel Vietnam',
        location: 'Hai Van Pass, Vietnam'
    },
    {
        id: 'following-6',
        title: 'Traditional ao dai fashion show  #aodai #fashion #vietnamese',
        userHandle: '@vietnamese_fashion',
        likes: 1234,
        comments: 234,
        shares: 56,
        isLiked: false,
        isBookmarked: false,
        hashtags: ['#aodai', '#fashion', '#vietnamese', '#traditional'],
        musicInfo: 'Traditional Melody - Vietnamese Fashion',
        location: 'Hue, Vietnam'
    },
    {
        id: 'following-7',
        title: 'Coffee culture in Vietnam  #coffee #vietnam #culture',
        userHandle: '@coffee_lover_vn',
        likes: 2345,
        comments: 345,
        shares: 78,
        isLiked: true,
        isBookmarked: false,
        hashtags: ['#coffee', '#vietnam', '#culture', '#cauphe'],
        musicInfo: 'Coffee Shop Vibes - Coffee Lover',
        location: 'Buon Ma Thuot, Vietnam'
    },
    {
        id: 'following-8',
        title: 'Fishing village life in Hoi An  #fishing #hoian #village',
        userHandle: '@hoian_life',
        likes: 3456,
        comments: 456,
        shares: 89,
        isLiked: false,
        isBookmarked: true,
        hashtags: ['#fishing', '#hoian', '#village', '#vietnam'],
        musicInfo: 'Village Life - Hoi An Life',
        location: 'Hoi An, Vietnam'
    },
    {
        id: 'following-9',
        title: 'Lantern festival in Hoi An  #lantern #festival #hoian',
        userHandle: '@festival_vietnam',
        likes: 4567,
        comments: 567,
        shares: 123,
        isLiked: true,
        isBookmarked: true,
        hashtags: ['#lantern', '#festival', '#hoian', '#vietnam'],
        musicInfo: 'Festival Night - Festival Vietnam',
        location: 'Hoi An Ancient Town'
    },
    {
        id: 'following-10',
        title: 'Rice terrace farming in Sapa  #rice #farming #sapa',
        userHandle: '@sapa_life',
        likes: 6789,
        comments: 789,
        shares: 234,
        isLiked: false,
        isBookmarked: false,
        hashtags: ['#rice', '#farming', '#sapa', '#vietnam'],
        musicInfo: 'Mountain Life - Sapa Life',
        location: 'Sapa, Vietnam'
    }
];
