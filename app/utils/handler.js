exports.extentionHandler = function (type) {

    contentTypes = {
        video: {
            ext: ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv']
        }, image: {
           ext: ['jpg', 'jpeg', 'png', 'gif', 'svg']
        }, audio:  {
            ext: ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'wma', 'aiff', 'alac', 'pcm', 'dsd', 'pm3']
        }, text: {
            ext: ['txt', 'doc', 'docx', 'pdf', 'odt', 'rtf', 'tex', 'wks', 'wps', 'wpd', 'key', 'odp', 'pps', 'ppt', 'pptx', 'ods', 'xlr', 'xls', 'xlsx']
        }
    }
    return Object.keys(contentTypes).find( (item) => contentTypes[item].ext.includes(type) ) || 'text'
    
}