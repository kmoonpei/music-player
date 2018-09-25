const API = {
    new_banner: "/?json=true",//新歌和banner
    recommend: '/plist/index&json=true',//推荐歌单
    rank: '/rank/list&json=true',//排行榜
    artist_class: '/singer/class&json=true',//歌手类型
    song_playlist: '/plist/list/',//歌单列表
    rank_list: '/rank/info/',//排行榜歌单列表
    singer_list: '/singer/list/',//歌手列表
    searchHot: '/api/v3/search/hot',//热门搜索
    searchResult: '/api/v3/search/song',//热门搜索结果
    song_detail: '/app/i/getSongInfo.php',// 播放歌曲信息
    song_lyrics:'/app/i/krc.php',//歌词
};
export default API;