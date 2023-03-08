import { getDevDeps } from './dep-list-constant';
import { ProjectType } from './project-helpers';

/**
 * Remove all the dev dependencies that are in lib's default list,
 * so that the following process can add them back with the latest version.
 * @param projectType
 * @param packageJSON
 */
export default function extractUserDeps(
  projectType: ProjectType,
  dependencies: Record<string, string>
): Record<string, string> {
  const devDeps = getDevDeps(projectType);
  return Object.entries(dependencies).reduce((nextDeps, [key, value]) => {
    if (devDeps.includes(key)) {
      return nextDeps;
    }

    return {
      ...nextDeps,
      [key]: value,
    };
  }, {});
}
