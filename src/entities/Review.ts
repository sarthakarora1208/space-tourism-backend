import {
  AfterInsert,
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

import { Business } from "./Business";
import { Order } from "./Order";
import { SpaceService } from "./SpaceService";
import { User } from "./User";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  stars: number;

  @Column({ nullable: false })
  content: string;

  @Column({ default: "" })
  reply: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // order
  @OneToOne(() => Order, (order) => order.review)
  // @JoinTable()
  order: Order;

  // business
  @ManyToOne(() => Business, (business) => business.reviews)
  business: Business;

  // user
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => SpaceService, (spaceService) => spaceService.reviews)
  spaceService: SpaceService;
}
