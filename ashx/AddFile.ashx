<%@ WebHandler Language="C#" Class="AddFile" %>

using System;
using System.Web;
using Newtonsoft.Json;

public class AddFile : IHttpHandler {

    const int Error_Unknown = 0;
    const int Error_Parameter = 1;
    const int Error_PathNotExist = 2;
    const int Error_LoginFailed = 3;
    const int Error_FolderIsExisted = 4;
    const int Error_FileIsExisted = 5;
  
    public void ProcessRequest (HttpContext context) {
        string strName = context.Request.QueryString["name"];
        string strPath = context.Request.QueryString["path"];
        if (strName == null || 0 == strName.Length || strPath == null || 0 == strPath.Length)
        {
            SendFault(context.Response, Error_Parameter, null);
            return;
        } 
        
        bool bRet = Upload(context, 0, context.Server.MapPath("../root") + strPath + strName );
        if (bRet)
        {
            JsonWriter jw = new JsonTextWriter(context.Response.Output);
            jw.WriteStartObject();
            jw.WritePropertyName("success");
            jw.WriteValue(true);
            jw.WriteEndObject();
        }
    }

    bool Upload(HttpContext context, int index, string strPath)
    {
        try
        {
            HttpPostedFile postedFile = context.Request.Files[index];
            string fileName = System.IO.Path.GetFileName(postedFile.FileName);
            if (fileName != "")
            {
                string fileType = fileName.Substring(fileName.LastIndexOf("."));
                string savePath = strPath + fileType;
                //检查是否在服务器上已经存在用户上传的同名文件
                if (System.IO.File.Exists(savePath))
                {
                    SendFault(context.Response, Error_FileIsExisted, null);
                    return false;
                }
                postedFile.SaveAs(savePath);
            }
            return true;
        }
        catch (Exception ex)
        {
            SendFault(context.Response, Error_Unknown, ex.Message);
            return false;
        }
    }
    
    public void SendFault(HttpResponse response, int code, string msg)
    {
        JsonWriter jw = new JsonTextWriter(response.Output);
        jw.WriteStartObject();
        jw.WritePropertyName("success");
        jw.WriteValue(false);
        jw.WritePropertyName("fault");
        jw.WriteStartObject();
        jw.WritePropertyName("code");
        jw.WriteValue(code);
        if (msg != null && 0 < msg.Length)
        {
            jw.WritePropertyName("message");
            jw.WriteValue(msg);
        }
        jw.WriteEndObject();
        jw.WriteEndObject();
    }   
    public bool IsReusable {
        get {
            return false;
        }
    }

}