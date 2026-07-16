using Newtonsoft.Json;

namespace DorbluxGlirx.Models
{
    public class DorbluxConfig
    {
        public string BrandName { get; set; }
        public string ExecutableName { get; set; }
        public string RootDirectory { get; set; }
        
        [JsonIgnore]
        public string ExecutablePath => System.IO.Path.Combine(RootDirectory, ExecutableName);

        public override string ToString()
        {
            return RootDirectory;
        }
    }
}