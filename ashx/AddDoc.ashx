<%@ WebHandler Language="C#" Class="AddDoc" %>

using System;
using System.Web;
using Newtonsoft.Json;

public class AddDoc : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        string[] strPaths = Upload(context);
        if (null == strPaths)
        {
            context.Response.Write("<xml>上传完成!</xml>");
            context.Response.Flush();
            return;
        }
        
        string strName = context.Request.Form["Name"];
        string strPath = context.Request.Form["Path"];
        string docs = context.Server.MapPath("..") + strPath + "\\docs.xml";

        System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
        if (System.IO.File.Exists(docs))
        {
            doc.Load(docs);
        }
        else
        {
            System.Xml.XmlElement elemRoot = doc.CreateElement("docs");
            doc.AppendChild(elemRoot);
        }

        
        for (int i = 0; i < strPaths.Length; i++)
        {
            HttpPostedFile postedFile = context.Request.Files[i];
            AddFile(doc, strPath, strName, strPaths[i], postedFile.ContentLength);
        }


        doc.Save(docs);

        context.Response.Write("<xml>上传失败,可能因为上传文件过大导致</xml>");
        context.Response.Flush();
    }

    public void AddFile(System.Xml.XmlDocument doc, string strPath, string strDocName, string strId, int nlen)
    {
        System.Xml.XmlElement elem = doc.CreateElement("doc");

        System.Xml.XmlAttribute attr = doc.CreateAttribute("name");
        attr.Value = strDocName;
        elem.Attributes.Append(attr);

        attr = doc.CreateAttribute("id");
        attr.Value = strId;
        elem.Attributes.Append(attr);
        
        attr = doc.CreateAttribute("time");
        attr.Value = DateTime.Now.ToShortDateString();
        elem.Attributes.Append(attr);
        
        attr = doc.CreateAttribute("size");
        attr.Value = nlen.ToString();
        elem.Attributes.Append(attr);

        doc.DocumentElement.AppendChild(elem);
    }

    string[] Upload(HttpContext context)
    {
        try
        {
            string saveFoler = context.Server.MapPath("../stack/");
            string savePath, fileName;
            string[] strPaths = new string[context.Request.Files.Count];
            
            //遍历File表单元素   
            for (int iFile = 0; iFile < context.Request.Files.Count; iFile++)
            {
                HttpPostedFile postedFile = context.Request.Files[iFile];
                fileName = System.IO.Path.GetFileName(postedFile.FileName);
                if (fileName != "")
                {
                    string fileType = fileName.Substring(fileName.LastIndexOf("."));
                    string guid = Guid.NewGuid().ToString("N");
                    string newName = guid + fileType;
                    savePath = saveFoler + newName;
                    //检查是否在服务器上已经存在用户上传的同名文件
                    if (System.IO.File.Exists(savePath))
                    {
                        System.IO.File.Delete(savePath);
                    }
                    postedFile.SaveAs(savePath);
                    strPaths[iFile] = guid;
                }
            }

            return strPaths;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}