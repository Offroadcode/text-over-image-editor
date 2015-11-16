namespace TextOverImage
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class ImageWithText
    {
        [JsonProperty("headline")]
        public string Headline { get; set; }

        [JsonProperty("media")]
        public TOIMedia Media { get; set; }

        [JsonProperty("subheadline")]
        public string Subheadline { get; set; }

        [JsonProperty("position")]
        public string Position { get; set; }

        public static ImageWithText Deserialize(string json)
        {
            // Validate the JSON
            if (json == null || !json.StartsWith("{") || !json.EndsWith("}"))
            {
                return null;
            }

            // Deserialize the JSON
            var jobj = (JObject)JsonConvert.DeserializeObject(json);
            return new ImageWithText()
            {
                Headline = jobj.Value<string>("headline"),
                Media = jobj.Value<TOIMedia>("media"),
                Subheadline = jobj.Value<string>("subheadline")
            };
        }
    }

}