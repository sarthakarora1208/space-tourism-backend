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
import { USD } from "../constants/currencyCodes";
import { ORDER_STATUS } from "../constants/status";
import { Business } from "./Business";
import { Review } from "./Review";
import { SpaceService } from "./SpaceService";

import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: ORDER_STATUS, default: ORDER_STATUS.INIT })
  status: ORDER_STATUS;

  @Column({ type: "decimal", precision: 7, scale: 2, default: 0.0 })
  amount: number;

  @Column({ default: USD })
  currency: string;

  @Column({ default: "" })
  serviceName: string;

  @Column({ type: "timestamptz", default: "NOW()" })
  startTime: Date;

  @Column({ type: "timestamptz", default: "NOW()" })
  endTime: Date;

  @Column({ default: "" })
  cancellationReason: string;

  @Column({ default: "" })
  cancellationComment: string;

  @Column({ default: "" })
  chatRoomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Review, (review) => review.order)
  @JoinColumn()
  review: Review;

  @ManyToOne(() => SpaceService, (spaceService) => spaceService.orders)
  spaceService: SpaceService;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Business, (business) => business.order)
  business: Business;
}
