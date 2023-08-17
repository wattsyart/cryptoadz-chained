namespace CrypToadzChained.Server.Models;

public sealed class GameSession
{
    public int Id { get; set; }
    public int Index { get; set; }
    public string Winner { get; set; }
}

public sealed class LruCache<TKey, TValue> where TKey : notnull
{
    private readonly int _capacity;
    private readonly Dictionary<TKey, LinkedListNode<CacheItem>> _cache;
    private readonly LinkedList<CacheItem> _list;

    public LruCache(int capacity)
    {
        _capacity = capacity;
        _cache = new Dictionary<TKey, LinkedListNode<CacheItem>>(capacity);
        _list = new LinkedList<CacheItem>();
    }

    public TValue? Get(TKey key)
    {
        if (!_cache.TryGetValue(key, out var node))
            return default;

        var value = node.Value;
        _list.Remove(node);
        _list.AddFirst(node);
        return value.Value;
    }

    public void Add(TKey key, TValue value)
    {
        if (_cache.Count >= _capacity)
        {
            var last = _list.Last;
            if (last != null)
            {
                _cache.Remove(last.Value.Key);
                _list.RemoveLast();
            }
        }

        var newNode = new LinkedListNode<CacheItem>(new CacheItem { Key = key, Value = value });
        _cache.Add(key, newNode);
        _list.AddFirst(newNode);
    }

    private class CacheItem
    {
        public TKey Key { get; init; } = default!;
        public TValue? Value { get; init; }
    }
}