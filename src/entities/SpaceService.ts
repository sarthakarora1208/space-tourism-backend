import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Business } from "./Business";
import { Order } from "./Order";
import { Rate } from "./Rate";
import { Review } from "./Review";

@Entity()
export class SpaceService {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: "no-url" })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamptz", default: "NOW()" })
  startTime: Date;

  @Column({ type: "timestamptz", default: "NOW()" })
  endTime: Date;

  @ManyToOne(() => Business, (business) => business.spaceServices)
  business: Business;

  @OneToMany(() => Order, (order) => order.spaceService)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.spaceService)
  reviews: Review[];

  @OneToMany(() => Rate, (rate) => rate.spaceService)
  rates: Rate[];
}
