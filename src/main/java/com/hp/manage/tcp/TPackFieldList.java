/*    */ package com.hp.manage.tcp;
/*    */ 
/*    */ import java.util.ArrayList;
/*    */ 
/*    */ class TPackFieldList extends ArrayList<String>
/*    */ {
/*    */   public void Add(String Value)
/*    */   {
/* 13 */     if (indexOf(Value) < 0)
/* 14 */       add(Value);
/*    */   }
/*    */ }

/* Location:           D:\项目软件\web项目\tmp\xuanzhuoproj\WEB-INF\classes\
 * Qualified Name:     com.xuanzhuo.dllcall.TPackFieldList
 * JD-Core Version:    0.6.0
 */