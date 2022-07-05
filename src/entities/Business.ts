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

import { Order } from "./Order";
import { Review } from "./Review";
import { SpaceService } from "./SpaceService";
import { User } from "./User";

@Entity()
export class Business {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  businessName: string;

  @Column({ default: "no-id" })
  eWallet: string;

  @Column({ default: "no-id" })
  contact: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: "GB" })
  country: string;

  @Column({ default: "" })
  phoneNumber: string;

  @Column({ default: "no-address" })
  address: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.business)
  users: User[];

  @OneToMany(() => Order, (order) => order.business)
  order: Order[];

  @OneToMany(() => SpaceService, (spaceService) => spaceService.business)
  spaceServices: SpaceService[];

  @OneToMany(() => Review, (review) => review.business)
  reviews: Review[];
}
