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
exports.Dish = void 0;
const typeorm_1 = require("typeorm");
const Speciality_1 = require("./Speciality");
const Restaurant_1 = require("./Restaurant");
const DishType_1 = require("./DishType");
const Ingredient_1 = require("./Ingredient");
const File_1 = require("./File");
let Dish = class Dish extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Dish.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dish.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dish.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'A' }),
    __metadata("design:type", String)
], Dish.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Dish.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Dish.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Speciality_1.Speciality, (speciality) => speciality.dishes),
    __metadata("design:type", Speciality_1.Speciality)
], Dish.prototype, "speciality", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.dishes),
    __metadata("design:type", Restaurant_1.Restaurant)
], Dish.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DishType_1.DishType, (dishType) => dishType.dishes),
    __metadata("design:type", DishType_1.DishType)
], Dish.prototype, "dishType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Ingredient_1.Ingredient, (ingredient) => ingredient.dish),
    __metadata("design:type", Array)
], Dish.prototype, "ingredients", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => File_1.File),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Dish.prototype, "files", void 0);
Dish = __decorate([
    (0, typeorm_1.Entity)()
], Dish);
exports.Dish = Dish;
