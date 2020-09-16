/**
 * 日期加天
 * date: 日期
 * day: 偏移天数
 */
export function AddDay(date:Date, day:number){
    let time = date.getTime();
    const dayMs:number = 24*3600*1000;
    let ms = time + (dayMs*day);
    return new Date(ms)
}

/**
 * 日期加月
 * date: 日期
 * month: 偏移月数
 */
export function AddMonth(date:Date, month:number){
    let time = date.getTime();
    const monthMs:number = 30*24*3600*1000;
    let ms = time + (monthMs*month);
    return new Date(ms)
}

/**
 * 日期加年
 * date: 日期
 * year: 偏移年数
 */
export function AddYear(date:Date, year:number){
    let time = date.getTime();
    const yearMs:number = 365*24*3600*1000;
    let ms = time + (yearMs*year);
    return new Date(ms)
}