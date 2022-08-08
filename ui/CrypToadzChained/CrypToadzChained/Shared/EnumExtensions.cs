using System.ComponentModel;

namespace CrypToadzChained.Shared
{
    public static class EnumExtensions
    {
        public static string? Describe<T>(this T @enum)
        {
            var field = @enum!.GetType().GetField(@enum.ToString()!);
            var attributes = (DescriptionAttribute[])field!.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes is { Length: > 0 } ? attributes[0].Description : @enum.ToString();
        }

        public static IEnumerable<object> GetValues<T>() where T : Enum
        {
            var values = Enum.GetValues(typeof(T));
            var list = new HashSet<object>();
            foreach (var value in values)
            {
                list.Add(value);
            }
            return list;
        }
    }
}
