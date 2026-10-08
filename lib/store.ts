'use client';
import {create} from 'zustand'; import {persist} from 'zustand/middleware';
type CartItem={id:string;name:string;price:number;image:string;quantity:number};
type State={items:CartItem[];wishlist:string[];add:(i:CartItem)=>void;remove:(id:string)=>void;setQty:(id:string,q:number)=>void;toggleWish:(id:string)=>void;clear:()=>void};
export const useStore=create<State>()(persist((set)=>({items:[],wishlist:[],add:(i)=>set(s=>{const e=s.items.find(x=>x.id===i.id);return{items:e?s.items.map(x=>x.id===i.id?{...x,quantity:x.quantity+1}:x):[...s.items,i]}}),remove:(id)=>set(s=>({items:s.items.filter(x=>x.id!==id)})),setQty:(id,q)=>set(s=>({items:q<1?s.items.filter(x=>x.id!==id):s.items.map(x=>x.id===id?{...x,quantity:q}:x)})),toggleWish:(id)=>set(s=>({wishlist:s.wishlist.includes(id)?s.wishlist.filter(x=>x!==id):[...s.wishlist,id]})),clear:()=>set({items:[]})}),{name:'nova-store'}));
