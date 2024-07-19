export type Users = {
  user_id: number,
  name: string,
  mobileNo: string,
  email: string,
};

export type Companys = {
  user_id: number,
  cop_id:number,
  company: string,
  caddress: string,
  branchcnt: string,
  ctechnology: string,
};
export type Branches = {
  cop_id: number,
  bh_id:number,
  branch: string,
  baddress: string,
  employeecnt: string,
  btechnology: string,
};
