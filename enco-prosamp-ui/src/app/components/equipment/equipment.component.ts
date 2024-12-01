import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../model/equipment/equipment.model";
import {EquipmentService} from "../../service/equipment.service";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipmentList: Equipment[] = [];
  equipmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService
  ) {
    this.equipmentForm = this.fb.group({
      name: ['', Validators.required],
      identifier: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments() {
    this.equipmentService.getAllEquipment().subscribe(data => {
      this.equipmentList = data;
    });
  }

  onSubmit() {
    if (this.equipmentForm.valid) {
      const newEquipment: Equipment = this.equipmentForm.value;
      this.equipmentService.saveEquipment(newEquipment).subscribe(response => {
        this.equipmentList.push(response);
        this.equipmentForm.reset();
      });
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id).subscribe(() => {
        this.equipmentList = this.equipmentList.filter(equipment => equipment.equipmentId !== id);
      });
    }
  }

}

// import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
//
// @Component({
//   selector: 'app-equipment',
//   templateUrl: './equipment.component.html',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule
//   ],
//   styleUrls: ['./equipment.component.css']
// })
// export class EquipmentComponent implements OnInit {
//   equipmentList: any[] = [];
//   equipmentForm: FormGroup;
//
//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.equipmentForm = this.fb.group({
//       name: ['', Validators.required],
//       identifier: ['', Validators.required],
//       description: ['']
//     });
//   }
//
//   ngOnInit(): void {
//     this.loadEquipments();
//   }
//
//   loadEquipments() {
//     this.http.get<any[]>('/api/equipments').subscribe(data => {
//       this.equipmentList = data;
//     });
//   }
//
//   onSubmit() {
//     if (this.equipmentForm.valid) {
//       this.http.post('/api/equipments', this.equipmentForm.value).subscribe(response => {
//         this.equipmentList.push(response);
//         this.equipmentForm.reset();
//       });
//     }
//   }
// }
