async function fetchDataSafe(endpoint: string) {
  // Возвращаем фолбек на localhost для локальной разработки, если переменная не подгрузилась
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const fullUrl = `${apiUrl}/${endpoint}`;
  
  console.log(`[API FETCH START]: Запрос на ${fullUrl}`);
  
  // Если переменная окружения пустая и фолбек не подходит, логируем это
  if (!apiUrl || apiUrl.startsWith('undefined')) {
    console.error(`[API FETCH ERROR]: Некорректный базовый URL API! Переменная NEXT_PUBLIC_API_URL не задана.`);
    return [];
  }
  
  try {
    const res = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`[API FETCH ERROR]: ${endpoint} вернул статус ${res.status}`);
      return [];
    }

    const textData = await res.text();
    if (!textData) {
      console.log(`[API FETCH EMPTY]: ${endpoint} вернул пустой ответ`);
      return [];
    }

    const json = JSON.parse(textData);
    console.log(`[API FETCH SUCCESS]: Данные для ${endpoint} успешно получены`);
    return json.data || json;
  } catch (error) {
    console.error(`[API FETCH FAILED]: Ошибка запроса к ${endpoint}:`, error);
    return [];
  }
}