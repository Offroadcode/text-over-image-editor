using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TextOverImage.Models
{
    public class TextOverImageLink
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("target")]
        public string Target { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        public static TextOverImageLink Deserialize(string json)
        {
            // Validate the JSON
            if (json == null || !json.StartsWith("{") || !json.EndsWith("}"))
            {
                return null;
            }

            // Deserialize the JSON
            var jobj = (JProperty)JsonConvert.DeserializeObject(json);
            return new TextOverImageLink
            {
                Id = (int)jobj.Value["id"],
                Name = (string)jobj.Value["name"],
                Target = (string)jobj.Value["target"],
                Url = (string)jobj.Value["url"]
            };

        }

    }
}
