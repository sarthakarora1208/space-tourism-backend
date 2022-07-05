import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SpaceService } from "./SpaceService";

@Entity()
export class Rate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 7, scale: 2, default: 0.0 })
  amount: number;

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SpaceService, (spaceService) => spaceService.rates)
  spaceService: SpaceService;
}
