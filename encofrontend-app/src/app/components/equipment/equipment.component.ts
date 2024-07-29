import { Component, OnInit } from '@angular/core';
import {Equipment} from "../../model/equipment/equipment.model";
import {EquipmentService} from "../../service/equipment.service";


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  standalone: true,
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipmentList: Equipment[] = [];

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment(): void {
    this.equipmentService.getAllEquipment().subscribe(
      (data: Equipment[]) => {
        this.equipmentList = data;
      },
      (error: any) => {
        console.error('Error fetching equipment data', error);
      }
    );
  }
}
