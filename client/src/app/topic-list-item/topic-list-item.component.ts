import { Component,Input } from '@angular/core';
import { Topic } from 'app/topic';
import { TopicApiService } from 'app/topic-api.service';

@Component({
  selector: 'app-topic-list-item',
  templateUrl: './topic-list-item.component.html',
  styleUrls: ['./topic-list-item.component.css']
})
export class TopicListItemComponent {
@Input() topic?:Topic;
@Input() topics?:Topic[];


constructor(private topicApiService:TopicApiService){}

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
    this.topics=this.topics?.sort((a,b)=>b.score-a.score)
  })
}
downvoteTopic(topic: Topic){
  this.topicApiService.voteDown(topic).subscribe(res => {
    console.log(res)
    topic.score--
    this.topics=this.topics?.sort((a,b)=>b.score-a.score)
  })
}

}
