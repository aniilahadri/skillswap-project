import { prisma } from "@/lib/prisma";
import type { SkillModel } from "@/lib/prisma/models/Skill";

export class SkillRepository {
    async findSkillByName(name: string): Promise<SkillModel | null> {
        return prisma.skill.findFirst({ where: { name } });
    }

    async createSkill(name: string, category?: string | null): Promise<SkillModel> {
        return prisma.skill.create({ 
            data: { 
                name,
                category: category || null
            } 
        });
    }

    async findOrCreateSkill(name: string, category?: string | null): Promise<SkillModel> {
        let skill = await this.findSkillByName(name);
        if (!skill) {
            skill = await this.createSkill(name, category);
        }
        return skill;
    }

    async findSkillById(skillId: string): Promise<SkillModel | null> {
        return prisma.skill.findUnique({ where: { skill_ID: skillId } });
    }

    async deleteSkill(skillId: string): Promise<SkillModel> {
        return prisma.skill.delete({ where: { skill_ID: skillId } });
    }
}

