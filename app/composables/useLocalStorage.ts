export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const data = ref<T>(defaultValue);

  const load = (): T => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error loading from localStorage (${key}):`, error);
      return defaultValue;
    }
  };

  const save = (value: T) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      data.value = value;
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  };

  const remove = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(key);
      data.value = defaultValue;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  };

  data.value = load();

  watch(
    data,
    (newValue) => {
      save(newValue);
    },
    { deep: true }
  );

  return {
    data,
    load,
    save,
    remove,
  };
};
