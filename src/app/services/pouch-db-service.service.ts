import {Injectable} from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class PouchDbServiceService {
  private db: any;

  constructor() {
    // PouchDB veritabanını oluşturuyoruz
    this.db = new PouchDB('heart-likes-db');
    (window as any).pouchDbService = this;
  }

// PouchDbService içinde getLikes fonksiyonunu güncelleyelim
  getLikes(): Promise<any> {
    return this.db.get('likes').then(doc => {
      // Eğer belge varsa, likes değerini döndür
      return doc.likes;
    }).catch((err) => {
      if (err.name === 'not_found') {
        // Eğer belge bulunmazsa, yeni bir belge oluştur ve likes değerini 0 olarak ayarla
        return this.db.put({
          _id: 'likes',
          likes: 0
        }).then(() => 0);  // Başlangıç değeri olarak 0 döner
      }
      // Diğer hataları yakala
      throw err;
    });
  }

  updateLikes(count: number): Promise<any> {
    return this.db.get('likes').then(doc => {
      // Eğer belge varsa, likes değerini güncelle
      doc.likes = count;
      return this.db.put(doc);
    }).catch(() => {
      // Eğer belge yoksa, yeni bir belge oluştur ve likes değerini ayarla
      return this.db.put({
        _id: 'likes',
        likes: count
      });
    });
  }

  incrementLikes(): Promise<any> {
    return this.db.get('likes').then(doc => {
      // Dokümanı bulduktan sonra likes sayısını 1 artır
      doc.likes++;
      return this.db.put(doc);  // Güncellenmiş dokümanı kaydet
    }).catch((err) => {
      if (err.name === 'not_found') {
        // Eğer doküman bulunmazsa, yeni bir doküman oluştur ve likes değerini 1 olarak başlat
        return this.db.put({
          _id: 'likes',
          likes: 1
        });
      }
      // Diğer hataları yakala
      throw err;
    });
  }

  resetLikes(): Promise<any> {
    return this.db.get('likes').then(doc => {
      // Mevcut dokümanı alıp, likes değerini 0 yapıyoruz
      doc.likes = 0;
      return this.db.put(doc);  // Güncellenmiş dokümanı kaydet
    }).catch((err) => {
      if (err.name === 'not_found') {
        // Eğer doküman yoksa, sıfırlama işlemi için yeni bir doküman oluştur
        return this.db.put({
          _id: 'likes',
          likes: 0
        });
      }
      // Diğer hataları yakala
      throw err;
    });
  }
}
