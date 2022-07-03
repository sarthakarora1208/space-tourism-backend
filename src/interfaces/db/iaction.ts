import { ITransaction } from './idbmetacontact';

export interface IAction{
    id:number,

    active:boolean,
    type:"transaction";
    /** Transaction id */
    tran_id:string,

    every:"hour"|"day"|"week"|"month"|"year",
    /** count of every */
    value:number,
    /** count of every */
    count:number,
    /** how many times it was executed */
    done_count:number,
    /** Date in seconds  */
    date:number,
    
    created_at?:number,
    contact_reference_id:number,
    meta:any
}