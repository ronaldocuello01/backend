"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const View_1 = require("./View");
const Dish_1 = require("./Dish");
const File_1 = require("./File");
const Speciality_1 = require("./Speciality");
let Restaurant = class Restaurant extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Restaurant.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ default: 'A' }),
    __metadata("design:type", String)
], Restaurant.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Dish_1.Dish, (dish) => dish.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "dishes", void 0);
__decorate([
    typeorm_1.OneToMany(() => View_1.View, (view) => view.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "views", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Speciality_1.Speciality),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Restaurant.prototype, "specialities", void 0);
__decorate([
    typeorm_1.ManyToMany(() => File_1.File),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Restaurant.prototype, "files", void 0);
Restaurant = __decorate([
    typeorm_1.Entity()
], Restaurant);
exports.Restaurant = Restaurant;
