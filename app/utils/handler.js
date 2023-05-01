exports.extentionHandler = function (type) {
    // return 'video'
    contentTypes = {
        videos: {
            ext: ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv'],
            text: 'video'
        }, images: {
           ext: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
           text: 'image'
        }, audio:  {
            ext: ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'wma', 'aiff', 'alac', 'pcm', 'dsd', 'pm3'],
            text: 'audio'
        }
    }
    return contentTypes.videos.ext.includes(type) ? 'video' : contentTypes.images.ext.includes(type) ? 'image' : contentTypes.audio.ext.includes(type) ? 'audio' : 'video';
    
}