import di from 'typedi';

export default async (exeption) => {
    const logger = di.Container.get('logger');
    logger.error('🔥 error: %o',  exeption );
};