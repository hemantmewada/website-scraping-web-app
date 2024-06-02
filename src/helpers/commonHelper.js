export function short(text, count){
    // return text.length;
    return text?.length > count ? `${text?.slice(0, count)}...` : text;
}