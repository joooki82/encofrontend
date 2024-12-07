import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {Equipment} from "../../../../model/equipment/equipment.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EquipmentService} from "../../../../shared/services/equipment.service";

@Component({
    selector: 'app-equipmentsave',
    templateUrl: './equipmentsave.component.html',
    styleUrl: './equipmentsave.component.scss',
    animations: [routerTransition()]
})
export class EquipmentsaveComponent implements OnInit {
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
