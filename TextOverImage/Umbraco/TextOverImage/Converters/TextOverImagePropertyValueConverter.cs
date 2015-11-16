namespace TextOverImage
{
    using Umbraco.Core.Models.PublishedContent;
    using Umbraco.Core.PropertyEditors;

    public class TextOverImagePropertyValueConverter : IPropertyValueConverter
    {
        public bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias == "TextOverImage.Editor";
        }

        public object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            return source;
        }

        public object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
        {
            return ImageWithText.Deserialize(source as string);
        }

        public object ConvertSourceToXPath(PublishedPropertyType propertyType, object source, bool preview)
        {
            return null;
        }
    }

}
