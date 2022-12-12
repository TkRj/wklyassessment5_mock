import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/topics';
  getTopics(): Observable<[Topic]> {
    return this.http.get<[Topic]>(this.url);
  }
  postTopic(title: string): Observable<Topic> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Topic>(this.url, { title }, httpOptions);
  }
  deleteTopic(id: string) {
    const newURL = this.url+"/"+id
    return this.http.delete<any>(newURL);
  }
  voteUp(topic: Topic) {
    const newURL = this.url+"/"+topic._id+"/up"
    return this.http.put<any>(newURL,topic.score);
  }
  voteDown(topic: Topic) {
    const newURL = this.url+"/"+topic._id+"/down"
    return this.http.put<any>(newURL,topic.score);
  }
}
