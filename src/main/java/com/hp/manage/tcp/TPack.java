/*     */ package com.hp.manage.tcp;
/*     */ 
/*     */ import java.util.HashMap;
/*     */ 
/*     */ public class TPack
/*     */ {
/*  21 */   private static char Pack_Maskchar = '\001';
/*  22 */   private static String Pack_Tag = "\r\n";
/*  23 */   private static String Pack_Tag_Header = "<?xml version=\"1.0\" encoding=\"GB2312\"?>";
/*  24 */   private static String Pack_Tag_Frame_Begin = "<Frame>";
/*  25 */   private static String Pack_Tag_Frame_End = "</Frame>";
/*  26 */   private static String Pack_Tag_FunNo_Begin = "<FunNo>";
/*  27 */   private static String Pack_Tag_FunNo_End = "</FunNo>";
/*  28 */   private static String Pack_Tag_ErrNo_Begin = "<ErrNo>";
/*  29 */   private static String Pack_Tag_ErrNo_End = "</ErrNo>";
/*  30 */   private static String Pack_Tag_ErrMsg_Begin = "<ErrMsg>";
/*  31 */   private static String Pack_Tag_ErrMsg_End = "</ErrMsg>";
/*  32 */   private static String Pack_Tag_Fields_Begin = "<Fields>";
/*  33 */   private static String Pack_Tag_Fields_End = "</Fields>";
/*  34 */   private static String Pack_Tag_Records_Begin = "<RecordSets>";
/*  35 */   private static String Pack_Tag_Records_End = "</RecordSets>";
/*  36 */   private static String Pack_Tag_Record_Begin = "<RecordSet>";
/*  37 */   private static String Pack_Tag_Record_End = "</RecordSet>";
/*     */   private String FunNo;
/*  40 */   private String ErrNo = "-1";
/*  41 */   private String ErrMsg = "";
/*  42 */   private TPackFieldList PackField = new TPackFieldList();
/*     */ 
/*  44 */   private HashMap RecordsList = new HashMap();
/*     */ 
/*     */   public String getFunNo()
/*     */   {
/*  48 */     return this.FunNo;
/*     */   }
/*     */ 
/*     */   public void setFunNo(String funNo) {
/*  52 */     this.FunNo = funNo;
/*     */   }
/*     */ 
/*     */   public String getErrNo() {
/*  56 */     return this.ErrNo;
/*     */   }
/*     */ 
/*     */   public void setErrNo(String errNo) {
/*  60 */     this.ErrNo = errNo;
/*     */   }
/*     */ 
/*     */   public String getErrMsg() {
/*  64 */     return this.ErrMsg;
/*     */   }
/*     */ 
/*     */   public void setErrMsg(String errMsg) {
/*  68 */     this.ErrMsg = errMsg;
/*     */   }
/*     */ 
/*     */   public int RecordCount() {
/*  72 */     return this.RecordsList.size();
/*     */   }
/*     */ 
/*     */   private String ExportField() {
/*  76 */     StringBuffer buffer = new StringBuffer();
/*     */ 
/*  78 */     for (int i = 0; i < this.PackField.size(); i++) {
/*  79 */       buffer.append((String)this.PackField.get(i));
/*  80 */       buffer.append(Pack_Maskchar);
/*     */     }
/*  82 */     return buffer.toString();
/*     */   }
/*     */ 
/*     */   private void ImportField(String Fields) {
/*  86 */     int start = 0;
/*  87 */     int end = Fields.indexOf(Pack_Maskchar, start);
/*  88 */     while (end >= 0) {
/*  89 */       this.PackField.Add(Fields.substring(start, end));
/*  90 */       start = end + 1;
/*  91 */       end = Fields.indexOf(Pack_Maskchar, start);
/*     */     }
/*     */   }
/*     */ 
/*     */   private void ImportRecord(int iRecordID, String Record)
/*     */   {
/*  98 */     if (Record == null) return;
/*  99 */     if (Record.length() <= 0) return;
/* 100 */     int start = 0;
/* 101 */     int end = Record.indexOf(Pack_Maskchar, start);
/* 102 */     int _index = 0;
/* 103 */     HashMap Recordmap = (HashMap)this.RecordsList.get(Integer.valueOf(iRecordID));
/* 104 */     if (Recordmap == null) {
/* 105 */       Recordmap = new HashMap();
/* 106 */       this.RecordsList.put(Integer.valueOf(iRecordID), Recordmap);
/*     */     }
/* 108 */     while (end >= 0)
/*     */     {
/* 110 */       String _value = Record.substring(start, end);
/* 111 */       start = end + 1;
/* 112 */       end = Record.indexOf(Pack_Maskchar, start);
/* 113 */       Recordmap.put(this.PackField.get(_index), _value);
/* 114 */       _index++;
/*     */     }
/*     */   }
/*     */ 
/*     */   private String GetRecordStr(HashMap Record)
/*     */   {
/* 120 */     if (Record == null) {
/* 121 */       return "";
/*     */     }
/* 123 */     StringBuffer buffer = new StringBuffer();
/*     */ 
/* 125 */     for (int i = 0; i < this.PackField.size(); i++) {
/* 126 */       String _FieldElement = (String)this.PackField.get(i);
/* 127 */       String value = Record.get(_FieldElement).toString();
/* 128 */       buffer.append(value);
/* 129 */       buffer.append(Pack_Maskchar);
/*     */     }
/* 131 */     return buffer.toString();
/*     */   }
/*     */ 
/*     */   private static String getTag(String xml, String Btag, String Etag) {
/* 135 */     int start = xml.indexOf(Btag);
/* 136 */     int end = xml.indexOf(Etag);
/* 137 */     String strValue = "";
/* 138 */     if ((end > start) && (start > 0))
/* 139 */       strValue = xml.substring(start + Btag.length(), end);
/* 140 */     return strValue;
/*     */   }
/*     */ 
/*     */   public void SetFieldValue(int iRecordID, String sFieldName, String sValue)
/*     */   {
/* 146 */     this.PackField.Add(sFieldName);
/* 147 */     HashMap Record = (HashMap)this.RecordsList.get(Integer.valueOf(iRecordID));
/* 148 */     if (Record == null) {
/* 149 */       Record = new HashMap();
/* 150 */       this.RecordsList.put(Integer.valueOf(iRecordID), Record);
/*     */     }
/* 152 */     Record.put(sFieldName, sValue);
/*     */ 
/* 154 */     this.RecordsList.put(Integer.valueOf(iRecordID), Record);
/*     */   }
/*     */ 
/*     */   public String FieldByName(int iRecordID, String sFieldName)
/*     */   {
/* 161 */     HashMap Record = (HashMap)this.RecordsList.get(Integer.valueOf(iRecordID));
/* 162 */     if (Record == null)
/* 163 */       return "";
/* 164 */     if (Record.get(sFieldName) == null) return "";
/* 165 */     return Record.get(sFieldName).toString();
/*     */   }
/*     */ 
/*     */   public void ImportPackXml(String xml) {
/* 169 */     this.FunNo = getTag(xml, Pack_Tag_FunNo_Begin, Pack_Tag_FunNo_End);
/* 170 */     this.ErrNo = getTag(xml, Pack_Tag_ErrNo_Begin, Pack_Tag_ErrNo_End);
/* 171 */     this.ErrMsg = getTag(xml, Pack_Tag_ErrMsg_Begin, Pack_Tag_ErrMsg_End);
/* 172 */     String _FieldStr = getTag(xml, Pack_Tag_Fields_Begin, Pack_Tag_Fields_End);
/* 173 */     ImportField(_FieldStr);
/* 174 */     String _Records = getTag(xml, Pack_Tag_Records_Begin, Pack_Tag_Records_End);
/* 175 */     int start = _Records.indexOf(Pack_Tag_Record_Begin);
/* 176 */     int end = _Records.indexOf(Pack_Tag_Record_End);
/* 177 */     int _index = 1;
/* 178 */     while ((start >= 0) && (start < end)) {
/* 179 */       String _Record = _Records.substring(start + Pack_Tag_Record_Begin.length(), end);
/* 180 */       ImportRecord(_index, _Record);
/* 181 */       start = _Records.indexOf(Pack_Tag_Record_Begin, end + Pack_Tag_Record_End.length());
/* 182 */       end = _Records.indexOf(Pack_Tag_Record_End, end + Pack_Tag_Record_End.length());
/* 183 */       _index++;
/*     */     }
/*     */   }
/*     */ 
/*     */   public String ExportPackXml()
/*     */   {
/* 190 */     StringBuffer buffer = new StringBuffer();
/* 191 */     buffer.append(Pack_Tag_Header);
/* 192 */     buffer.append(Pack_Tag);
/* 193 */     buffer.append(Pack_Tag_Frame_Begin);
/* 194 */     buffer.append(Pack_Tag);
/* 195 */     buffer.append(Pack_Tag_FunNo_Begin);
/* 196 */     buffer.append(this.FunNo);
/* 197 */     buffer.append(Pack_Tag_FunNo_End);
/* 198 */     buffer.append(Pack_Tag);
/* 199 */     buffer.append(Pack_Tag_ErrNo_Begin);
/* 200 */     buffer.append(this.ErrNo);
/* 201 */     buffer.append(Pack_Tag_ErrNo_End);
/* 202 */     buffer.append(Pack_Tag);
/* 203 */     buffer.append(Pack_Tag_ErrMsg_Begin);
/* 204 */     buffer.append(this.ErrMsg);
/* 205 */     buffer.append(Pack_Tag_ErrMsg_End);
/* 206 */     buffer.append(Pack_Tag);
/*     */ 
/* 208 */     buffer.append(Pack_Tag_Fields_Begin);
/* 209 */     String Fields = ExportField();
/* 210 */     buffer.append(Fields);
/* 211 */     buffer.append(Pack_Tag_Fields_End);
/* 212 */     buffer.append(Pack_Tag);
/*     */ 
/* 214 */     buffer.append(Pack_Tag_Records_Begin);
/* 215 */     buffer.append(Pack_Tag);
/*     */ 
/* 217 */     for (int i = 1; i <= this.RecordsList.size(); i++) {
/* 218 */       HashMap Record = (HashMap)this.RecordsList.get(Integer.valueOf(i));
/* 219 */       if (Record != null) {
/* 220 */         String RecordStr = GetRecordStr(Record);
/*     */ 
/* 222 */         buffer.append(Pack_Tag_Record_Begin);
/* 223 */         buffer.append(RecordStr);
/* 224 */         buffer.append(Pack_Tag_Record_End);
/* 225 */         buffer.append(Pack_Tag);
/*     */       }
/*     */     }
/* 228 */     buffer.append(Pack_Tag_Records_End);
/* 229 */     buffer.append(Pack_Tag);
/* 230 */     buffer.append(Pack_Tag_Frame_End);
/*     */ 
/* 232 */     buffer.append(Pack_Tag);
/*     */ 
/* 234 */     return buffer.toString();
/*     */   }
/*     */ }

/* Location:           D:\项目软件\web项目\tmp\xuanzhuoproj\WEB-INF\classes\
 * Qualified Name:     com.xuanzhuo.dllcall.TPack
 * JD-Core Version:    0.6.0
 */