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
  }
  ngOnInit(): void {
    this.getServices()
  }
  deleteTopic(topic: Topic){
    this.topicApiService.deleteTopic(topic._id).subscribe(
      res => {
        if (this.topics) this.topics.splice(this.topics.indexOf(topic), 1)
      }
    )
  }
  upvoteTopic(topic: Topic){
    this.topicApiService.voteUp(topic).subscribe(res => {
      console.log(res)
      topic.score++
    })
  }
  downvoteTopic(topic: Topic){
    this.topicApiService.voteDown(topic).subscribe(res => {
      console.log(res)
      topic.score--
    })
  }
}
