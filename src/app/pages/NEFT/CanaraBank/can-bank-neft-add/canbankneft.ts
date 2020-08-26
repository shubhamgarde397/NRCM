export class canbankneft {

    constructor(
        public accType?: number,
        public accno?: number,
        public accDate?: string,
        public paymentDate?: string,
        public bankName?: string,
        public truckNo?: string,
        public name?: string,
        public IFSC?: string,
        public amt?: number,
        public summary: string = 'Advance',
        public transferType?: string,
        public mobileNo?: number
    ) { }
}
