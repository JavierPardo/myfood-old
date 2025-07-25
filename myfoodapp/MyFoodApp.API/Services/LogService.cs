using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class LogService : ILogService
    {
        public (bool , object ) GetPath(string path)
        {
            path = path == null ? string.Empty : path;
            var isFile=File.Exists(path);
            object content=null;
            string queryPath= System.IO.Directory.GetParent(Environment.CurrentDirectory).ToString();
            queryPath = Path.GetFullPath(Path.Combine(queryPath, path)); 
            if (File.Exists(queryPath))
                content = File.ReadAllText(queryPath);
            if(Directory.Exists(queryPath))
                content=new { files= Directory.GetFiles(queryPath), folders=Directory.GetDirectories(queryPath) };
            return (isFile, content);
        }
    }
}
