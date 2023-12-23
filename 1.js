"use strict";

/*
###Задание 1 
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/


const musicCollection = {
  albums: [
    {
      title: "Назад в прошлое",
      artist: "KorgStyle",
      year: "2019",
    },
    {
      title: "Дискография",
      artist: "Dj Polkovnik",
      year: "2020",
    },
    {
      title: "Just Forget",
      artist: "RILTIM",
      year: "2022",
    },
  ],

  // возвращаем итератор с помощью метода
  [Symbol.iterator]() {
    let index = 0; // выставляем индекс текущего альбома

    // с помощью условия работаем с методом next() итератора
    const next = () => {
      if (index < this.albums.length) {
        const album = this.albums[index];
        index++; // для следующей итерации увеличиваем индекс
        return { value: album, done: false }; // возвращаем текущий альбом
      } else {
        return { done: true }; // итерация завершена
      }
    };

    return { next }; // возвращаем объект итератора
  },
};

// перебираем альбомы в коллекции и выводим их на печать в консоль
//вариант 1
for (const album of musicCollection) {
  console.log(`Альбом-> ${album.title} - ${album.artist} (${album.year})`);
}

//вариант 2
// for (let album of musicCollection.albums) {
//   console.log(album.title + " - " + album.artist + " (" + album.year + ")");
// }