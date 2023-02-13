import { Component, OnInit } from '@angular/core';
import { Topic } from '../topic';
import { TopicApiService } from '../topic-api.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  constructor(private topicApiService: TopicApiService){}
  topics: [Topic] | undefined
  newtopic: string | undefined;
  getServices(){
    this.topicApiService.getTopics().subscribe(res => this.topics = res)
  }
  postTopic(){
    if (this.newtopic) {
      this.topicApiService.postTopic(this.newtopic).subscribe(res => {
        this.topics?.push(res)
      })
    }
    this.newtopic=''
  }
  postTopicEnter(){
    if (this.newtopic) {
      this.topicApiService.postTopic(this.newtopic).subscribe(res => {
        this.topics?.push(res)
      })
    }
    this.newtopic=''
  }
  ngOnInit(): void {
    this.getServices()
  }

}
