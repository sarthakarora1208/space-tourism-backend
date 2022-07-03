import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail } from "class-validator";
import { USER_ROLE } from "./../constants/userRoles";
// import { Order } from "./Order";
// import { Business } from "./Business";
// import { Review } from "./Review";
// import { GENDER } from "../constants/gender";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email!: string;

  @Column({ nullable: false })
  phone!: string;

  @Column({ nullable: false })
  username: string;

  @Column({ type: "timestamptz", default: "NOW()" })
  dob: Date;

  // gender
  //   @Column({ type: "enum", enum: GENDER, default: GENDER.MALE })
  //   gender: GENDER;

  @Column({ type: "enum", enum: USER_ROLE, default: USER_ROLE.CUSTOMER })
  role!: USER_ROLE;

  @Column({ default: "no-url" })
  profileImageUrl: string;

  @Column({ default: "no-address" })
  address: string;

  @Column({ default: "no-street" })
  state: string;

  @Column({ default: "no-street" })
  city: string;

  @Column({ default: "Canada" })
  country: string;

  @Column({ default: "" })
  postalCode: string;

  @Column({ default: false })
  allowMessagesFromOtherCustomer: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
