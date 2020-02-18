export class booking {
  ToPartyGST: any;
  constructor(
    public Date?: string,
    public lrno?: number,
    public nop?: string,
    public PartyGST?: string,
    public FromPartyGST?: string,
    public FromParty?: string,
    public truckno?: string,
    public hamt?: string,
    public place?: string,
    public OwnerName?: string,
    public PAN?: string,
    public Payment?: string,
    public PaymentRecDate?: string,
    public amt?: string
  ) { }
}
