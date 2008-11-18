<%@ WebHandler Language="C#" Class="AddFolder" %>

using System;
using System.Web;

public class AddFolder : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string strName = context.Request.Form["Name"];
        string strPath = context.Request.Form["Path"];
        
        //
        CreateFolder(context.Server.MapPath("..") + strPath, strName);
        
        context.Response.ContentType = "text/plain";
        context.Response.Write("<return>Hello World</return>");
    }

    public void CreateFolder(string strPath, string strNewFolder)
    {
        string dirs = strPath + "\\dirs.xml";

        System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
        if (System.IO.File.Exists(dirs))
        {
            doc.Load(dirs);
        }
        else
        {
            System.Xml.XmlElement elemRoot = doc.CreateElement("dirs");
            doc.AppendChild(elemRoot);
        }

        System.Xml.XmlElement elem = doc.CreateElement("dir");
        System.Xml.XmlAttribute attr = doc.CreateAttribute("name");
        attr.Value = strNewFolder;

        elem.Attributes.Append(attr);
        doc.DocumentElement.AppendChild(elem);
        doc.Save(dirs);

        // create real folder
        strPath = strPath + '\\' + strNewFolder;

        if (!System.IO.Directory.Exists(strPath))
            System.IO.Directory.CreateDirectory(strPath);
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}