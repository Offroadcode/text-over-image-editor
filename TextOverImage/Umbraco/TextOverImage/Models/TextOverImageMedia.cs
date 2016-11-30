namespace TextOverImage.Models
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class TextOverImageMedia
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("altText")]
        public string AltText { get; set; }

        public static TextOverImageMedia Deserialize(string json)
        {
            // Validate the JSON
            if (json == null || !json.StartsWith("{") || !json.EndsWith("}"))
            {
                return null;
            }

            // Deserialize the JSON
            var jobj = (JProperty)JsonConvert.DeserializeObject(json);
            return new TextOverImageMedia()
            {
                Id = (int)jobj.Value["id"],
                Url = (string)jobj.Value["url"],
                Width = (int)jobj.Value["width"],
                Height = (int)jobj.Value["height"],
                AltText = (string)jobj.Value["altText"]
            };
            
        }

    }
    
}
