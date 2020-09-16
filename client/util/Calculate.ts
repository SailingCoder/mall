export default class Calucate{
    /** 
    * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。 
    * 
    * @param num1加数1
    * @param num2加数2
    */
    public static numAdd(num1: number, num2: number): number{
        let baseNum: number, baseNum1: number, baseNum2: number;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    };
    /** 
     * 加法运算，避免数据相减小数点后产生多位数和计算精度损失。 
     * 
     * @param num1被减数 
     * @param num2减数
     */
    public static numSub(num1: number, num2: number): number{
        let baseNum: number, baseNum1: number, baseNum2: number;
        let precision: number; // 精度 
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum);//.toFixed(precision);
    };
    /** 
     * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。 
     * 
     * @param num1被乘数 | num2乘数 
     */
    public static numMulti(num1: number, num2: number): number{
        let baseNum: number = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) { }
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) { }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    };
    /** 
     * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。 
     * 
     * @param num1被除数 | num2除数 
     */
    public static numDiv(num1: number, num2: number) {
        let baseNum1: number = 0,
            baseNum2: number = 0;
        let baseNum3: number, baseNum4: number;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    }

    /**
     * 多值累加
     */
    public static add(...pargs:any[]) {
        var arrTemp = [],
            args = Array.prototype.slice.apply(arguments);
        arrTemp = args.map((item:any, index:number) =>{
            item = item || "0";
            return parseFloat(item.toString());
        });

        return arrTemp.reduce(Calucate.numAdd, 0);
    }
}