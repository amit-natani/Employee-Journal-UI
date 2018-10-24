import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';

@Component({
  selector: 'app-feedback-self',
  templateUrl: './feedback-self.component.html',
  styleUrls: ['./feedback-self.component.css']
})
export class FeedbackSelfComponent implements OnInit {

  billingHeads: object[]
  @Input() data: any;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
  }

}
